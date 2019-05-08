<template>
<ul class="cate-list">
    <div v-for="(value, i) in list" :key="value.id"
        v-if="i%2===0">
        <!-- 获得偶数个 -->
        <cate-item :value="value"></cate-item>
        <!-- i+1就是奇数个 -->
        <cate-item v-if="(i+1)<list.length" :value="list[i+1]"></cate-item>
    </div>
</ul>
</template>

<script>
import CateItem from './CateItem'
export default {
    name: 'cate-list',
    components: {
        [CateItem.name]: CateItem
    },
    props: {
        list: Array
    }
}
</script>

<style lang="scss" scoped>
.cate-list{
    padding: 5px;
    box-sizing: border-box;
    &>div{
        overflow: hidden;
    }
}
</style>

