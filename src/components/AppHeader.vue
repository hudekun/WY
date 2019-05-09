<template>
    <header class="app-header border-bottom">
        <van-icon @click="backAction" class="back-button" name="arrow-left" />
        <h1 class="title"> 
            <img src="../assets/logo.png"/>
        </h1>
    </header>
</template>

<script>
export default {
    name: 'app-header',
    methods: {
        backAction(){
            this.$router.back();
        }
    }
}
</script>

<style scoped lang="scss">
.app-header{
    width: 100%;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    .back-button{
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        font-size: 24px;
    }
    .title{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 30px;
        }
    }



}
</style>
