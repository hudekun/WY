<template>
<div id="detail" class="page subpage">
    <app-header></app-header>
</div>
</template>

<script>
export default {
    created(){
        console.log(this.$route.params);
        // 请求商品详情数据
    }
}
</script>

<style>

</style>
