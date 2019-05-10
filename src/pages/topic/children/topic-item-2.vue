<template>
  <div class="topic-item" id="item-2">
    <div class="left">
      <div class="header">
        <img v-lazy="info.avatar">
        <span>{{info.nickname}}</span>
      </div>
      <h3 class="title">{{info.title}}</h3>
      <h6 class="sub-title">{{info.subTitle}}</h6>
      <p class="watch">{{info.readCount}}人看过</p>
    </div>
    <div class="right" :style="{backgroundImage: `url(${info.picUrl})`}">
    </div>
  </div>
</template>

<script>
export default {
  name: "topic-item-2",
  props: {
    info: Object
  }
};
</script>

<style lang="scss" scoped>
#item-2 {
  color: #333;
  display: flex;
  .left {
    flex: 1;
    .header {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        font-size: 14px;
        padding-left: 6px;
      }
    }
    .title {
      padding: 10px 0;
      font-size: 16px;
      font-weight: normal;
    }
    .sub-title{
        color: #7F7F7F;
        font-size: 12px;
        font-weight: normal;
        padding: 0 0 10px 0;
    }
    .watch {
      font-size: 12px;
      color: #999;
      padding-top: 4px;
    }
  }
  .right {
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center center;
  }
}
</style>

