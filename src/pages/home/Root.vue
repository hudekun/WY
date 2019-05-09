<template>
<div>
    <div id="home" class="page">
        <!-- 头部 -->
        <header class="header">
            <div class="logo"><img src="../../assets/logo.png"/></div>
            <div class="search"><van-icon name="search" />搜索商品，共{{total}}款好物</div>
            <div class="login">登录</div>
        </header>
        
        <!-- 菜单 -->
        <home-menu @menuChange="handleMenuChange"></home-menu>
        <!-- 推荐内容 -->
        <app-scroll v-show="selectIndex===0" class="content main-content">
            <!-- 轮播图 -->
            <div class="swiper-container banner">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
                        <img :src="banner.picUrl"/>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!-- 协议 -->
            <ul class="policy">
                <li class="policy-item" v-for="(item, index) in policiy" :key="index">
                    <img :src="item.icon"/>
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <!-- 分类 -->
            <ul class="cate-list">
                <li class="cate-item" v-for="cateItem in cateList" :key="cateItem.name"
                    @click="goCategoryListPage(cateItem)">
                    <img :src="cateItem.picUrl"/>
                    <p>{{cateItem.name}}</p>
                </li>
            </ul>
            <!-- 品牌直供 -->
            <div class="brand module">
                <h2 class="title">
                    <b>品牌制造商直供</b>
                    <span>更多</span>
                </h2>
                <ul class="brand-list">
                    <li class="brand-item" v-for="item in brand" :key="item.id">
                        <img :src="item.picUrl"/>
                        <h3>{{item.name}}</h3>
                        <p>{{item.floorPrice}}元起<span v-if="item.newOnShelf">上新</span></p>
                    </li>
                </ul>
            </div>
            <!-- 类目热销榜 -->
            <div class="hot module">
                <h2 class="title">
                    <b>类目热销榜</b>
                </h2>
                <ul class="hot-list">
                    <li class="hot-item" v-for="item in hotSell" :key="item.name">
                        <h3>{{item.name}}</h3>
                        <img :src="item.picUrl"/>
                    </li>
                </ul>
            </div>

        </app-scroll>

        <!-- 其他的分类内容 -->
        <app-scroll ref="cateContent" v-show="selectIndex!==0 && !loading" class="content cate-content">
            <cate-list-panel :banner="homeCateBanner" :list="homeCateList">
            </cate-list-panel>
        </app-scroll>

        
    </div>

    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <router-view></router-view>
    </transition>

</div>
</template>

<script>
import {mapState} from 'vuex'
import HomeMenu from './children/home-menu'
import CateListPanel from './children/cate-list-panel'
import { Toast } from 'vant'
export default {
    components: {
        [HomeMenu.name]: HomeMenu,
        [CateListPanel.name]: CateListPanel
    },
    data(){
        return {
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            loading: state=>state.loading,
            total: state=>state.home.total,
            bannerList: state=>state.home.bannerList,
            policiy: state=>state.home.policiy,
            cateList: state=>state.home.cateList,
            brand: state=>state.home.brand,
            hotSell: state=>state.home.hotSell,
            homeCateBanner: state=>state.home.homeCateBanner,
            homeCateList: state=>state.home.homeCateList
        })
    },
    watch: {
        homeCateList(){
            // 切换分类内容时，重置滚动视图，滚动到顶部
            this.$refs.cateContent.reset();
            // 隐藏loading
            this.$store.commit('setLoading', false);
        }
    },
    methods: {
        //菜单栏发生变化
        handleMenuChange(params){
            this.selectIndex = params.index;
            if(this.selectIndex !== 0){
                //需要展示分类的商品列表
                // 请求数据
                this.$store.dispatch('home/requestCateListData', {id: params.id, from: 'home'});
                // 显示loading
                this.$store.commit('setLoading', true);
            }else{
                // 隐藏loading
                this.$store.commit('setLoading', false);
            }

        },
        // 进入分类商品列表页面
        goCategoryListPage(item){
            if(item.id){
                //进入分类商品列表页面
                this.$router.push(`/home/cate/${item.id}`);
            }else{
                //提示用户
                Toast({
                    message: '敬请期待',
                    duration: 1500
                });
            }
        }
    },
    created(){
        // 派发请求，请求商品总数
        this.$store.dispatch('home/requestTotalData');
        // 派发请求，请求导航栏数据
        this.$store.dispatch('home/requestHomeNavData');
        // 派发请求，请求轮播图数据
        this.$store.dispatch('home/requestHomeBannerData');
        // 派发请求，请求协议数据
        this.$store.dispatch('home/requestPolicyData');
        // 派发请求，请求分类数据
        this.$store.dispatch('home/requestHomeCateData');
        // 派发请求，请求品牌直供
        this.$store.dispatch('home/requestHomeBrandData');
        // 派发请求，请求类目热销榜
        this.$store.dispatch('home/requestHomeHotSellData');
    },
    mounted(){
        // 创建轮播图
        this.mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination'
        });
        this.mySwiper.hasRefresh = false;
    },
    updated(){
        if(!this.mySwiper.hasRefresh && this.bannerList.length>0){
            this.mySwiper.hasRefresh = true;
            // 更新轮播图
            this.mySwiper.update();
            this.mySwiper.reLoop();
            this.mySwiper.slideTo(1, 0);
            console.log('更新了');
        }
    }
}
</script>

<style scoped lang="scss">
.header{
    height: 44px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px 15px;
    box-sizing: border-box;
    display: flex;
    .logo{
        height: 100%;
        img{
            height: 100%;
        }
    }
    .search{
        flex: 1;
        margin: 0 10px;
        padding: 0 10px;
        background: #ededed;
        border-radius: 4px;
        color: #666;
        font-size: 12px;
        line-height: 28px;
    }
    .login{
        padding: 6px;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        align-self: center;
        color: #b4282d;
        border: 1px solid #b4282d;
        border-radius: 4px;
    }
}
.module{
    margin-top: 12px;
    background: #fff;
    padding-bottom: 15px;
    .title{
        position: relative;
        padding: 8px 15px;
        font-size: 18px;
        color: #333;
        font-weight: normal;
        b{
            font-weight: normal;
        }
        span{
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            font-size: 14px;
        }
    }
}
.content{
    width: 100%;
    position: absolute;
    top: 74px;
    left: 0;
    bottom: 0;
    background: #f4f4f4;
}
.main-content{
    .banner{
        background: #fff;
        img{
            width: 100%;
        }
    }
    .policy{
        background: #fff;
        display: flex;
        padding: 6px 15px;
        .policy-item{
            flex: 1;
            display: flex;
            align-items: center;
            img{
                display: inline-block;
                width: 18px;
            }
            span{
                font-size: 12px;
                color: #b4282d;
            }
        }
        
    }
    .cate-list{
        background: #fff;
        overflow: hidden;
        padding: 12px 0;
        .cate-item{
            width: 20%;
            float: left;
            img{
                width: 75%;
                margin: 0 auto;
            }
            p{
                text-align: center;
                color: #333;
                font-size: 12px;
                line-height: 24px;
            }
        }
    }
    .brand{
        
        .brand-list{
            padding: 0 15px;
            display: flex;
            flex-wrap: wrap;
            .brand-item{
                position: relative;
                border: 1px solid #fff;
                width: 50%;
                box-sizing: border-box;
                img{
                    width: 100%;
                }
                h3{
                    position: absolute;
                    top: 10px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    font-size: 16px;
                    color: #333;
                    line-height: 16px;
                }
                p{
                    position: absolute;
                    top: 30px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    font-size: 12px;
                    color: #7F7F7F;
                    span{
                        color: #fff;
                        background: #CBB693;
                        padding: 0 4px;
                        border-radius: 2px;
                        margin-left: 4px;
                    }
                }
            }
        }
    }
    .hot{
        .hot-list{
            display: flex;
            flex-wrap: wrap;
            padding: 0 15px;
            .hot-item{
                width: 25%;
                background: #F5F5F5;
                border: 2px solid #fff;
                padding: 5px 0;
                box-sizing: border-box;
                img{
                    width: 100%;
                }
                h3{
                    font-size: 13px;
                    color: #333;
                    text-align: center;
                }
            }
            .hot-item:nth-of-type(1){
                background: #F9F3E4;
            }
            .hot-item:nth-of-type(2){
                background: #EBEFF6;
            }
            .hot-item:nth-of-type(1),.hot-item:nth-of-type(2){
                width: 50%;
                position: relative;
                h3{
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    &::after{
                        content: '';
                        display: block;
                        width: 25px;
                        height: 2px;
                        background: #333;
                        position: absolute;
                        left: 0;
                        bottom: -4px;
                    }
                }
                img{
                    width: 100px;
                    height: 100px;
                    float: right;
                }
            }
        }
    } 
}
</style>

<style lang="scss">
#home{
    .banner{
        .swiper-pagination-bullet {
            width: 18px;
            height: 2px;
            border-radius: 0;
            background: #fff;
            opacity: 0.4;
        }
        .swiper-pagination-bullet-active{
            opacity: 1;
        }
    }
}
</style>

