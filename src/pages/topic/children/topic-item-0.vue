<template>
<div class="topic-item" id="item-0">
    <div class="header">
        <img v-lazy="info.avatar"/>
        <span>{{info.nickname}}</span>
    </div>
    <h3 class="title">{{info.title}}</h3>
    <img class="main-img" v-lazy="info.picUrl"/>
    <p class="watch">{{info.readCount}}人看过</p>
</div>
</template>

<script>
export default {
    name: 'topic-item-0',
    props: {
        info: Object
    }
}
</script>

<style lang="scss" scoped>
#item-0{
    color: #333;
    .header{
        display: flex;
        align-items: center;
        img{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            overflow: hidden;
        }
        span{
            font-size: 14px;
            padding-left: 6px;
        }
    }
    .title{
        padding: 10px 0;
        font-size: 16px;
        font-weight: normal;
    }
    .main-img{
        width: 100%;
    }
    .watch{
        font-size: 12px;
        color: #999;
        padding-top: 4px;
    }
}
</style>

