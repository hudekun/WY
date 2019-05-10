<template>
<div id="topic" class="page">
    <header class="header border-bottom">
        <h1 class="title">发现</h1>
    </header>
    <nav class="nav border-bottom">
        <li class="nav-item" v-for="(item, index) in navList" :key="item.id"
            :class="{active: index===selectIndex}"
            @click="selectNavAction(index)">
            {{item.name}}
        </li>
    </nav>
    <!-- 内容根据选中的nav-item来决定 -->
    <app-scroll v-show="selectIndex !== 1 && !loading" class="content" ref="scroll">
        
        <template v-for="item in topicList">
            <!-- <topic-item-0 :key="item.id" v-if="item.type===0" :info="item">
            </topic-item-0>
            <topic-item-2 :key="item.id" v-else-if="item.type===2" :info="item">
            </topic-item-2>
            <topic-item-8 :key="item.id" v-else-if="item.type===8" :info="item">
            </topic-item-8>
            <topic-item-7 :key="item.id" v-else-if="item.type===7 && item.itemList.length>=4" :info="item">
            </topic-item-7> -->

            <component :key="item.id" :is="getItemName(item.type)" :info="item"/>
            
        </template>


    </app-scroll>

    <app-scroll v-if="selectIndex === 1" class="content">
        <h1>晒单</h1>
    </app-scroll>


</div>
</template>

<script>
import {mapState} from 'vuex'
import TopicItem0 from './children/topic-item-0'
import TopicItem2 from './children/topic-item-2'
import TopicItem7 from './children/topic-item-7'
import TopicItem8 from './children/topic-item-8'
export default {
    components: {
        [TopicItem0.name]: TopicItem0,
        [TopicItem2.name]: TopicItem2,
        [TopicItem7.name]: TopicItem7,
        [TopicItem8.name]: TopicItem8
    },
    data(){
        return {
            navList: [
                {name: '推荐', id: '9'},
                {name: '晒单', id: '-1'},
                {name: '达人', id: '4'},
                {name: '上新', id: '13'},
                {name: 'HOME', id: '6'}
            ],
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            topicList: state=>state.topic.topicList,
            loading: state=>state.loading
        })
    },
    methods: {
        // 导航栏的nav切换
        selectNavAction(index){
            this.selectIndex = index;
        },
        //获得组件的类型
        getItemName(type){
            switch (type) {
                case 0:
                    return 'topic-item-0';
                case 2:
                    return 'topic-item-2';
                case 7:
                    return 'topic-item-7';
                case 8:
                    return 'topic-item-8';
            }
        }
    },
    watch: {
        // 监听下标的变化，请求列表数据
        selectIndex: {
            immediate: true,
            handler(newVal){
                // 请求数据
                let id = this.navList[newVal].id;
                if(id>0){
                    this.$store.dispatch('topic/requestTopicListData', {id});
                    // 显示loading
                    this.$store.commit('setLoading', true);
                    
                }
            }
        },
        topicList(){
            // 隐藏loading
            this.$store.commit('setLoading', false);
            // 重置滚动视图到顶部
            this.$refs.scroll.reset();
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    .title{
        width: 100%;
        height: 100%;
        font-size: 18px;
        text-align: center;
        line-height: 44px;
        color: #b4282d;
    }
}
.nav{
    width: 100%;
    height: 30px;
    position: absolute;
    top: 44px;
    left: 0;
    display: flex;
    .nav-item{
        flex: 1;
        text-align: center;
        line-height: 30px;
        color: #7F7F7F;
        font-size: 14px;
        &.active{
            color: #b4282d;
            border-bottom: 2px solid #b4282d;
        }
    }
}
.content{
    position: absolute;
    top: 74px;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #f4f4f4;
    .topic-item{
        margin-top: 12px;
        background: #fff;
        padding: 8px;
    }
}
</style>

