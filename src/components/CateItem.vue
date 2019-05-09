<template>
<li class="cate-item" @click="goDetail">
    <div class="main">
        <img v-lazy="value.picUrl"/>
        <span v-if="value.place">{{value.place}}</span>
        <p>{{value.simpleDesc}}</p>
    </div>
    <h6 class="title">{{value.title}}</h6>
    <p class="price">
        <span>¥{{value.retailPrice}}</span>
        <span v-if="value.retailPrice !== value.counterPrice">¥{{value.counterPrice}}</span>
    </p>
    <p class="tags">
        <span v-for="tag in value.itemTagList" :key="tag">
            {{tag}}
        </span>
    </p>
</li>
</template>

<script>
export default {
    name: 'cate-item',
    props: {
        value: Object
    },
    methods: {
        goDetail(){
            // this.$router.push(`${this.$route.fullPath}/detail/${this.value.id}`);
        }
    }
}
</script>

<style scoped lang="scss">
.cate-item{
    padding: 5px;
    width: 50%;
    box-sizing: border-box;
    float: left;
    .main{
        position: relative;
        background: #f4f4f4;
        border-radius: 4px;
        overflow: hidden;
        img{
            width: 100%;
        }
        span{
            position: absolute;
            top: 4px;
            left: 4px;
            border: 1px solid #b4a078;
            color: #b4a078;
            background: #f4f4f4;
            font-size: 12px;
            padding: 3px;
            width: 12px;
            text-align: center;
            line-height: 14px;
            border-radius: 2px;

        }
        p{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 24px;
            background: #F1ECE2;
            color: #9F8A60;
            font-size: 12px;
            line-height: 24px;
            padding: 0 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .title{
        font-size: 13px;
        color: #333;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 28px;
    }
    .price{
        line-height: 15px;
        height: 15px;
        span:nth-of-type(1){
            color: #b4282d;
            font-size: 15px;
        }
        span:nth-of-type(2){
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
            padding: 0 5px;
        }
    }
    .tags{
        span{
            color: #CE2424;
            border: 1px solid #CE2424;
            font-size: 12px;
            display: inline-block;
            height: 18px;
            border-radius: 9px;
            padding: 0 2px;
        }

    }
}
</style>
