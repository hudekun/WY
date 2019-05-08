<template>
<nav class="tab-list border-top">
    <router-link class="tab-item" 
        v-for="tabItem in tabList" :key="tabItem.id" 
        :to="tabItem.path">

        <em></em>
        <span>{{tabItem.name}}</span>
        
    </router-link>
</nav>
</template>

<script>
export default {
    name: 'app-tabs',
    data(){
        return {
            tabList: [
                {id: 'home', name: '首页', path: '/home'},
                {id: 'category', name: '分类', path: '/category'},
                {id: 'topic', name: '识物', path: '/topic'},
                {id: 'cart', name: '购物车', path: '/cart'},
                {id: 'personal', name: '个人', path: '/personal'}
            ]
        }
    }
}
</script>

<style scoped lang='scss'>
.tab-list{
    width: 100%;
    height: 49px;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    background: #fff;
    .tab-item{
        height: 100%; 
        padding: 5px 0;
        box-sizing: border-box;
        flex: 1;
        display: flex;
        flex-direction: column;
        color: #666;
        &.router-link-active{
            color: #b4282d;
        }
        &:nth-of-type(1) em{
            background-position: 0 -125px;
        }
        &:nth-of-type(1).router-link-active em{
            background-position: 0 -100px;
        }
        &:nth-of-type(2) em{
            background-position: 0 -75px;
        }
        &:nth-of-type(2).router-link-active em{
            background-position: 0 -50px;
        }
        &:nth-of-type(3) em{
            background-position: 0 -175px;
        }
        &:nth-of-type(3).router-link-active em{
            background-position: 0 -150px;
        }
        &:nth-of-type(4) em{
            background-position: 0 -25px;
        }
        &:nth-of-type(4).router-link-active em{
            background-position: 0 0;
        }
        &:nth-of-type(5) em{
            background-position: 0 -225px;
        }
        &:nth-of-type(5).router-link-active em{
            background-position: 0 -200px;
        }
        em{
            width: 20px;
            height: 20px;
            margin: 0 auto;
            background-image: url(../assets/tabs.png);
            background-size: 100%;
        }
        span{
            padding-top: 4px;
            text-align: center;
            line-height: 12px;
            font-size: 12px;
        }
    }


}



</style>
