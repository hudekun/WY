<template>
<div class="topic-item" id="item-8">
    <h3 class="title">{{info.title}}</h3>
    <img class="main-img" v-lazy="info.picUrl"/>
    <p class="watch">{{info.readCount}}人看过</p>
</div>
</template>

<script>
export default {
    name: 'topic-item-8',
    props: {
        info: Object
    }
}
</script>

<style lang="scss" scoped>
#item-8{
    color: #333;
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

