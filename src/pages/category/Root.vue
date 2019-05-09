<template>
<div>
    <div class="page" id="category">
        <!-- 头部 -->
        <header class="header border-bottom">
            <h1 class="title">
                <van-icon name="search"/>
                搜索商品, 共{{total}}款好物
            </h1>
        </header>

        <!-- 内容 -->
        <div class="content">
            <!-- 左边栏 -->
            <cate-nav :list="navData" v-model="selectIndex"></cate-nav>
            <!-- 右边栏 -->
            <cate-menu :data="menuData" :id="navId"></cate-menu>
        </div>
    </div>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <router-view></router-view>
    </transition>

</div>
</template>

<script>
import { mapState } from 'vuex';
import CateNav from './children/cate-nav'
import CateMenu from './children/cate-menu'
export default {
    components: {
        [CateNav.name]: CateNav,
        [CateMenu.name]: CateMenu
    },
    data(){
        return {
            // 选中的左边菜单
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            total: state=>state.home.total,
            // 左边栏数据
            navData: state=>state.category.navData,
            // 右边栏数据
            menuData: state=>state.category.menuData
        }),
        navId(){
            //计算右边栏请求的id
            if(this.navData.length > 0){
                return this.navData[this.selectIndex].id;
            }else{
                return '';
            }
        }
    },
    watch: {
        navId(newVal){
            // 请求选中右边菜单数据
            this.$store.dispatch('category/getMenuDataAction', {id: newVal});
            // 显示loading
            this.$store.commit('setLoading', true);
        },
        menuData(){
            // 隐藏loading
            this.$store.commit('setLoading', false);
        }
    },
    created(){
        // 请求左边栏数据
        this.$store.dispatch('category/getNavDataAction');
        // 请求默认右边菜单数据
        this.$store.dispatch('category/getMenuDataAction', {});
        // 显示loading
        this.$store.commit('setLoading', true);
    }
}
</script>

<style lang="scss" scoped>
#category{
    .header{
        width: 100%;
        height: 44px;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 15px;
        box-sizing: border-box;
        .title{
            font-size: 12px;
            color: #666;
            background: #ededed;
            border-radius: 4px;
            line-height: 24px;
            text-align: center;
            font-weight: normal;
        }
    }
    .content{
        width: 100%;
        height: 100%;
        padding-top: 44px;
        box-sizing: border-box;
        display: flex;
        .nav{
            width: 100px;
        }
        .menu{
            flex: 1;
        }
    }
    
}
</style>
