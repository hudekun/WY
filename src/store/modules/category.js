import api from '../../ajax/api'
import request from '../../ajax/request'
const state = {
    // 左边栏
    navData: [],
    // 右边栏
    menuData: {
        // banner图片
        url: '',
        // 分类列表
        data: []
    },
    // 分类页面的商品数据
    listData: {
        name: '',//标题
        data: []//商品列表
    }
}

const mutations = {
    setNavData(state, param){
        state.navData = param;
    },
    setMenuData(state, param){
        state.menuData = param;
    },
    setListData(state, param){
        state.listData = param;
    }
}

const actions = {
    // 请求分类页面左边栏数据
    async getNavDataAction(context){
        let result = await request.get(api.CATE_NAV_API);
        let newData = result.data.map(({id, name})=>({id, name}));
        context.commit('setNavData', newData);
    },
    // 请求分类页面右边菜单数据
    async getMenuDataAction(context, {id}){
        let result = await request.get(api.CATE_MENU_API, {categoryId: id});
        let url = result.data.currentCategory.wapBannerUrl;
        let newData = result.data.categoryGroupList.map(({id, name, categoryList})=>{
            let list = categoryList.map(({id, name, wapBannerUrl})=>({id, name, bannerUrl: wapBannerUrl}));
            return {
                id,
                name,
                list
            }
        })
        context.commit('setMenuData', {url, data: newData});
    },

    // 请求分类的商品列表数据
    requestListData(context, {categoryId, subCategoryId}){
        //根据id请求商品列表
        request.get(api.CATE_LIST_API, {
            categoryId,
            subCategoryId
        })
        .then(data=>{
            //处理数据
            let name = data.data.category.frontName;
            let newData = data.data.itemList.map(value=>{
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
            //提交
            context.commit('setListData', {
                name,
                data: newData
            });
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}