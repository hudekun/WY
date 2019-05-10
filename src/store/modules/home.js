import api from '../../ajax/api'
import request from '../../ajax/request'
const state = {
    total: 0,
    navList: [],
    bannerList: [],
    policiy: [],
    cateList: [],
    brand: [],
    hotSell: [],
    homeCateBanner: '',
    homeCateList: [],
    cateData: {
        banner: '',
        list: []
    }
}

const mutations = {
    setTotal(state, params){
        state.total = params.value;
    },
    setNavList(state, params){
        state.navList = params.value;
    },
    setBannerList(state, params){
        state.bannerList = params.value;
    },
    setPolicy(state, params){
        state.policiy = params.value;
    },
    setCateList(state, params){
        state.cateList = params.value;
    },
    setBrand(state, params){
        state.brand = params.value;
    },
    setHotSell(state, params){
        state.hotSell = params.value;
    },
    setHomeCateBanner(state, params){
        state.homeCateBanner = params.value;
    },
    setHomeCateList(state, params){
        state.homeCateList = params.value;
    },
    setCateData(state, params){
        state.cateData = params.value;
    }
}

const actions = {
    // 请求首页的商品总数
    async requestTotalData(context, params){
        // 发送请求
        let data = await request.get(api.GOODS_TOTAL_API);
        //得到结果
        let total = data.data.total;
        context.commit('setTotal', {value: total});
    },
    // 请求首页的分页的导航数据
    async requestHomeNavData(context, params){
        let data = await request.get(api.HOME_MENU_API);
        let newData = data.data.map(({id, name})=>({id, name}));
        context.commit('setNavList', {value: newData});
    },
    //请求首页的分页的轮播图数据
    async requestHomeBannerData(context, params){
        let data = await request.get(api.HOME_BANNER_API);//异步
        let newData = data.data.map(({id, picUrl})=>({id, picUrl}));
        context.commit('setBannerList', {value: newData});
    },
    //请求首页的协议数据
    async requestPolicyData(context, params){
        let data = await request.get(api.POLICY_API);
        let newData = data.data.map(({desc, icon})=>({icon, name: desc}));
        context.commit('setPolicy', {value: newData});
    },
    // 请求首页的分类数据
    async requestHomeCateData(context, params){
        let data = await request.get(api.HOME_CATE_API);
        let newData = data.data.kingKongList.map(({picUrl, text, schemeUrl})=>{
            // 解析url中的参数
            function getQueryString(urlObj, name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");//匹配参数
                if(urlObj.split("?")[1]){
                    var r = urlObj.split("?")[1].match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }else{
                    return null;
                }
            }
            return {
                picUrl, 
                name: text,
                id: getQueryString(schemeUrl, 'categoryId')
            }
        });
        context.commit('setCateList', {value: newData});
    },
    //请求品牌直供数据
    async requestHomeBrandData(context, params){
        let data = await request.get(api.HOME_BRAND_API);
        let newData = data.data.map(({id, picUrl, name, floorPrice, newOnShelf})=>({id, picUrl, name, floorPrice, newOnShelf}));
        context.commit('setBrand', {value: newData});

    },
    //请求类目热销榜
    async requestHomeHotSellData(context, params){
        let data = await request.get(api.HOME_HOT_SELL_API);
        let newData = data.data.categoryList.map(({categoryName, picUrl})=>({picUrl, name: categoryName}));
        context.commit('setHotSell', {value: newData});
    },
    // 请求分类商品列表
    async requestCateListData(context, params){
        
        let data = await request.get(api.HOME_CATE_LIST_API, {id: params.id});
        // 处理数据
        let url = data.data.currentCategory.bannerUrl;
        let newData = data.data.categoryItemList.map(item=>{
            let newItem = {
                title: item.category.name,
                subtitle: item.category.frontName,
                id: item.category.id
            };
            newItem.list = item.itemList.map(value=>{
                return {
                    id: value.id,
                    title: value.name,
                    picUrl: value.listPicUrl,
                    counterPrice: value.counterPrice,
                    retailPrice: value.retailPrice,
                    place: value.productPlace || (value.colorNum>1 ? `${value.colorNum}色可选` : ''),
                    simpleDesc: value.simpleDesc,
                    itemTagList: value.itemTagList.map(({name})=>name)
                }
            })
            return newItem;
        });
        // 提交数据
        // 判断哪个位置调用的action
        if(params.from === 'home'){
            context.commit('setHomeCateBanner', {value: url});
            context.commit('setHomeCateList', {value: newData});
        }
        else if(params.from === 'cate'){
            context.commit('setCateData', {value: {
                banner: url,
                list: newData
            }});
        }
            

    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}