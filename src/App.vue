<template>
<div id="app">

    <keep-alive>
        <router-view/>
    </keep-alive>
    
    <app-tabs/>

    <!-- 加载指示器 -->
    <div class="loading" v-show="loading">
        <van-loading type="spinner" />
    </div>
        
    
    
</div>
</template>

<script>
import Tabs from './components/Tabs'
import {mapState} from 'vuex'
export default {
    components: {
        [Tabs.name]: Tabs
    },
    computed: {
        ...mapState({
            loading: state=>state.loading
        })
    }
}
</script>

<style lang="scss" scoped>
.loading{
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    .van-loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
    }
}
</style>
