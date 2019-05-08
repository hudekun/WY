<template>
<!-- 固定的大小，滚动区域有多大，这个div就多大 -->
<!-- 需要滚动的内容都发在div的第一个子元素中 -->
<!-- 标签大小由外部提供 -->
<div class="scroll" ref="scroll">
    <div>
        <slot/>
    </div>
</div>
</template>

<script>
export default {
    name: 'app-scroll',
    methods: {
        reset(){
            this.scroll.scrollTo(0, 0, 0);
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll);
       
        this.scroll.on('beforeScrollStart', ()=>{
            this.scroll.refresh();
        });
    }
}
</script>

<style scoped>
.scroll{
    overflow: hidden;
}
</style>
