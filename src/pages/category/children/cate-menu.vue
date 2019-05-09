<template>
     <app-scroll class="menu" ref="scroll">
         <div class="wrap">
             <h3 class="banner">
                <img :src="data.url"/>
            </h3>
            <div class="menu-wrap" v-for="item in data.data" :key="item.id">
                <h5 class="title border-bottom" v-if="item.name">
                    {{item.name}}
                </h5>
                <ul class="menu-list">
                    <li class="menu-item" v-for="value in item.list" :key="value.id"
                        @click="goSubCatePage(value.id)">
                        <img :src="value.bannerUrl"/>
                        <p>{{value.name}}</p>
                    </li>
                </ul>
            </div>
         </div>
     </app-scroll>
</template>

<script>
export default {
    name: 'cate-menu',
    props: {
        data: Object,
        id: [Number, String]
    },
    watch: {
        id(){
            //左边栏发生变化，右边栏数据会重新请求，需要重置滚动视图到顶部
            this.$refs.scroll.reset();
        }
    },
    methods: {
        goSubCatePage(subCateId){
            this.$router.push(`/category/sub-cate/${this.id}/${subCateId}`);
        }
    }
}
</script>
<style lang="scss" scoped>
.menu{
    .wrap{
        padding: 10px;
    }
    .banner img{
        width: 100%;
    }
    .menu-wrap{
        .title{
            color: #333;
            margin: 10px 0;
            padding: 5px 0;
        }
        .menu-list{
            display: flex;
            flex-wrap: wrap;
            .menu-item{
                padding: 5px 0;
                width: 33.33%;
                flex-shrink: 0;
                img{
                    width: 80%;
                    margin: 0 auto;
                }
                p{
                    margin: 0 auto;
                    width: 80%;
                    font-size: 12px;
                    color: #999;
                    text-align: center;
                }
            }
        }
    }
}
</style>

