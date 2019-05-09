<template>
    <div class="cate-list-panel">
        <div class="banner">
            <img :src="banner"/>
        </div>
        <!-- 列表 -->
        <div class="list module" v-for="item in list" :key="item.id">
            <h3 class="title">{{item.title}}</h3>
            <h5 class="subtitle">{{item.subtitle}}</h5>
            <cate-list :list="item.list"></cate-list>
        </div>
    </div>
</template>

<script>
import CateList from '../../../components/CateList'
export default {
    name: 'cate-list-panel',
    components: {
        [CateList.name]: CateList
    },
    props: {
        banner: String,
        list: Array
    }
}
</script>

<style scoped lang="scss">
.cate-list-panel{
    .banner{
        img{
            width: 100%;
        }
    }
    .list{
        .title{
            font-size: 16px;
            text-align: center;
        }
        .subtitle{
            font-size: 12px;
            color: #999;
            text-align: center;
            font-weight: normal;
            padding-bottom: 5px;
        }
    }
}
</style>
