<template>
<app-scroll class="nav">
    <div class="nav-item" v-for="(item, index) in list" :key="item.id"
        :class="{active: value === index}"
        @click="selectAction(index)">
        <span>
            {{item.name}}
        </span>
    </div>
</app-scroll>
</template>

<script>
export default {
    name: 'cate-nav',
    props: {
        list: Array,
        value: Number//组件数据双向绑定
    },
    methods: {
        selectAction(index){
            //组件数据双向绑定
            this.$emit('input', index);
        }
    }
}
</script>

<style scoped lang="scss">
.nav{
    padding: 10px 0;
    position: relative;
    &::after{
        content: '';
        display: block;
        height: 100%;
        width: 1px;
        border-right: 1px solid #d9d9d9;
        transform: scaleX(0.5);
        position: absolute;
        right: 0px;
        top: 0;
    }
    .nav-item{
        padding: 10px 0;
        color: #333;
        font-size: 14px;
        text-align: center;
        span{
            display: block;
            border-left: 2px solid transparent;
            border-right: 2px solid transparent;
        }
        &.active{
            color: #ab2b2b;
            span{
                border-left: 2px solid #ab2b2b;
            }
        }
    }
}
</style>
