<template>
<div class="page subpage">
    <div class="page subpage" id="category-list">
        <app-header></app-header>
        <app-scroll class="content">
            <cate-list-panel :banner="banner" :list="list"></cate-list-panel>
        </app-scroll>
    </div>
    
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import CateListPanel from './children/cate-list-panel'
import {mapState} from 'vuex'
export default {
    components: {
        [CateListPanel.name]: CateListPanel
    },
    computed: {
        ...mapState({
            banner: state=>state.home.cateData.banner,
            list: state=>state.home.cateData.list
        })
    },
    watch: {
        banner(){
            this.$store.commit('setLoading', false);
        }
    },
    created(){
        // 获得分类id
        let id = this.$route.params.id;
        // 根据id请求分类商品列表
        this.$store.dispatch('home/requestCateListData', {id, from: 'cate'});
        // 显示loading
        this.$store.commit('setLoading', true);

    },
    beforeDestroy(){
        // 清空数据
        this.$store.commit('home/setCateData', {
            value: {
                banner: '',
                list: []
            }
        });
        // 关闭loading
        this.$store.commit('setLoading', false);

    }
}
</script>

<style scoped lang="scss">
.content{
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 0;
}
</style>
