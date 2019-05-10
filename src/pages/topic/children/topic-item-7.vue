<template>
  <div class="topic-item" id="item-7">
    <h3 class="title">{{info.title}}</h3>
    <h6 class="sub-title">{{info.subTitle}}</h6>
    <ul class="goods-list">
      <li class="goods-item" v-for="item in info.itemList" :key="item.id">
        <div class="wrap">
          <img v-lazy="item.itemUrl"/>
        </div>
      </li>
    </ul>
    <p class="watch">{{info.readCount}}人看过</p>
  </div>
</template>

<script>
export default {
  name: "topic-item-7",
  props: {
    info: Object
  }
};
</script>

<style lang="scss" scoped>
#item-7 {
  .title {
    padding: 10px 0;
    font-size: 16px;
    font-weight: normal;
  }
  .sub-title {
    color: #7f7f7f;
    font-size: 12px;
    font-weight: normal;
    padding: 0 0 10px 0;
  }
  .watch {
    font-size: 12px;
    color: #999;
    padding-top: 4px;
  }
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    .goods-item{
      width: 25%;
      flex-shrink: 0;
      .wrap{
        padding: 5px;
      }
      img{
        width: 100%;
        background: #f4f4f4;
      }

    }
  }
}
</style>

