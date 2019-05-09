<template>
<div class="page subpage">
    <div class="page subpage" id="sub-cate-list">
        <!-- 头部 -->
        <app-header></app-header>
        <!-- 菜单 -->
        <div class="nav-wrap border-bottom" ref="navWrap">
            <ul class="nav" ref="nav">
                <li ref="navItem" v-for="(item, index) in navList" :key="item.id"
                    class="nav-item" :class="{active: selectIndex===index}"
                    @click="selectNavAction(index)">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <!-- 列表 -->
        <app-scroll class="content" v-show="!loading">
            <h3 class="title">{{name}}</h3>
            <cate-list :list="listData"></cate-list>
        </app-scroll>
    </div>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import {mapState} from 'vuex'
import CateList from '../../components/CateList'
export default {
    components: {
        [CateList.name]: CateList
    },
    data(){
        return {
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            loading: state=>state.loading,
            menuData: state=>state.category.menuData.data,
            name: state=>state.category.listData.name,
            listData: state=>state.category.listData.data
        }),
        //导航栏分类数据
        navList(){
            let newData = [];
            this.menuData.forEach(({list})=>{
                newData = [...newData, ...list];
            })
            return newData;
        }
    },
    watch: {
        //监听选中的下标，滚动到可以显示位置
        selectIndex(index){
            // 计算列表的大小
            let item = this.$refs.navItem[index];
            let left = item.offsetLeft * (-1);
            let min = this.navScroll.x;
            let max = this.navScroll.x - this.navScroll.wrapperWidth;
            if(left < min && left > max){
                //可以看见，不需要滚动
            }else if(left >= min){
                // 前面看不见
                this.navScroll.scrollTo(left, 0, 0);
            }else if(left <= max){
                //后面看不见
                let offset = left + this.navScroll.wrapperWidth;
                offset -= item.offsetWidth;
                this.navScroll.scrollTo(offset, 0, 0);
            }
        },
        listData(){
            // 隐藏loading
            this.$store.commit('setLoading', false);
        }
    },
    methods: {
        //导航栏分类的点击事件
        selectNavAction(index){
            this.selectIndex = index;
            //请求商品列表数据
            this.$store.dispatch('category/requestListData', {
                categoryId: this.$route.params.categoryId,
                subCategoryId: this.navList[index].id,
            });
            // 显示loading
            this.$store.commit('setLoading', true);
        }
    },
    created(){
        // 计算第几个选中
        this.selectIndex = this.navList.findIndex(({id})=>(id == this.$route.params.subCategoryId));
        //请求商品列表数据
        this.$store.dispatch('category/requestListData', {
            categoryId: this.$route.params.categoryId,
            subCategoryId: this.$route.params.subCategoryId,
        });
        // 显示loading
        this.$store.commit('setLoading', true);
    },
    mounted(){
        // 创建横向滚动视图
        this.navScroll = new IScroll(this.$refs.navWrap, {
            scrollX: true,
            scrollY: false,
            tap: true,
            click: true
        });
        this.navScroll.on('beforeScrollStart', ()=>{
            //计算可以滚动的位置
            let items = this.$refs.navItem;
            let width = 0;
            items.forEach(item=>{
                width += item.offsetWidth + 20;
            })
            // 设置宽度
            this.$refs.nav.style.width = width + 'px';
            // 刷新
            this.navScroll.refresh();
        })
    }
}
</script>

<style lang="scss" scoped>
.nav-wrap{
    height: 30px;
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    overflow: hidden;
    .nav{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        .nav-item{
            margin: 0 10px;
            padding: 0 5px;
            border-top: 2px solid transparent;
            border-bottom: 2px solid transparent;
            line-height: 26px;
            flex-shrink: 0;
            font-size: 14px;
            color: #333;
            &.active{
                color: #b4282d;
                border-bottom: 2px solid #b4282d;
            }
        }
    }
}
.content{
    position: absolute;
    top: 74px;
    left: 0;
    bottom: 0;
    width: 100%;
    .title{
        border-top: 12px solid #f4f4f4;
        font-size: 14px;
        font-weight: normal;
        color: #333;
        text-align: center;
        padding: 20px 0;
    }
}

</style>

