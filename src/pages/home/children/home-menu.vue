<template>
<div class="home-menu border-bottom">

    <div class="arrow">
        <span></span>
        <span @click="triggerAction">
            <van-icon name="arrow-down"  :class="{show: !show}"/>
        </span>
    </div>

    <!-- 滚动菜单 -->
    <div class="scroll-wrap" ref="menuScroll" v-show="show">
        <ul class="menu-type1" :style="{width: menuWidth+'px'}">
            <li class="menu-item" :class="{active: index===selectIndex}"
            ref="menu" v-for="(item, index) in navData" :key="item.id"
            @click="selectMenuAction(index)">
                {{item.name}}
            </li>
        </ul>
    </div>

    <!-- 下拉展示菜单 -->
    <div v-show="!show">
        <div class="cover" @click="triggerAction"></div>
        <div class="menu-wrap">
            <div class="title">全部频道</div>
            <ul class="menu-type2">
                <li class="menu-item" v-for="(item, index) in navData" :key="item.id">
                    <span :class="{active: index==selectIndex}"
                    @click="selectMenuAction(index)">
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
    </div>

    
    
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'home-menu',
    data(){
        return {
            menuWidth: 0,
            show: true,
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            navList: state=>state.home.navList
        }),
        navData(){
            return [{id: -1, name: '推荐'}, ...this.navList]
        }
    },
    watch: {
        selectIndex(newVal){
            // 将下标告诉home页面组件
            this.$emit('menuChange', {index: newVal, id: this.navData[newVal].id});
        }
    },
    methods: {
        triggerAction(){
            this.show = !this.show;
        },
        selectMenuAction(index){
            //切换选中的下标
            this.selectIndex = index;
            // 收起下拉菜单
            this.show = true;
            //获得显示的item的位置
            this.$nextTick(()=>{
                let item = this.$refs.menu[index];
                let left = item.offsetLeft * (-1);
                let min = this.scroll.x;
                let max = this.scroll.x - this.scroll.wrapperWidth;
                if(left < min && left > max){
                    //可以看见，不需要滚动
                }else if(left >= min){
                    // 前面看不见
                    this.scroll.scrollTo(left, 0, 0);
                }else if(left <= max){
                    //后面看不见
                    let offset = left + this.scroll.wrapperWidth;
                    offset -= item.offsetWidth;
                    this.scroll.scrollTo(offset, 0, 0);
                }
            })
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.menuScroll, {
            scrollX: true,
            scrollY: false
        });
        this.scroll.on('beforeScrollStart', ()=>{
            this.scroll.refresh();
        })
    },
    updated(){
       
        // 计算列表的大小
        if(this.menuWidth === 0){
            // 计算滚动宽度
            let width = 0;
            this.$refs.menu.forEach(item=>{
                width += item.offsetWidth;
            })
            // 赋值给滚动视图
            this.menuWidth = width;
            this.$nextTick(()=>{
                this.scroll.refresh();
            })
        }
        
    }
}
</script>

<style scoped lang="scss">
.home-menu{
    width: 100%;
    height: 30px;
    position: absolute;
    top: 44px;
    left: 0;
    overflow: hidden;
    .arrow{
        position: absolute;
        z-index: 20;
        top: 0;
        right: 0;
        width: 70px;
        height: 30px;
        display: flex;
        span:nth-of-type(1){
            width: 20px;
            background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
        }
        span:nth-of-type(2){
            background: #fff;
            flex: 1;
            text-align: center;
            line-height: 30px;
            color: #333;
            .van-icon{
                transition: 500ms transform;
                &.show{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .scroll-wrap{
        position: absolute;
        top: 0;
        left: 0;
        right: 70px;
        height: 100%;
        // overflow: hidden;
    }
    .menu-type1{
        display: flex;
        flex-wrap: nowrap;
        .menu-item{
            flex-shrink: 0;
            padding: 0 10px;
            font-size: 14px;
            color: #333;
            line-height: 28px;
            height: 28px;
            border-bottom: 2px solid #fff;
        }
        .menu-item.active{
            color: #b4282d;
            border-bottom: 2px solid #b4282d;
        }
    }
    .cover{
        width: 100%;
        position: fixed;
        top: 44px;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 10;
    }
    .menu-wrap{
        position: fixed;
        top: 44px;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 10;

        .title{
            padding-left: 15px;
            font-size: 14px;
            color: #333;
            line-height: 30px;
        }
    }
    .menu-type2{
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        .menu-item{
            padding: 0 8px;
            width: 25%;
            box-sizing: border-box;
            margin: 10px 0;
            span{
                display: block;
                width: 100%;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
                color: #333;
                background: #FAFAFA;
                border: 1px solid #CCC;
                border-radius: 2px;
                text-align: center;
            }
            span.active{
                border: 1px solid #b4282d;
                color: #b4282d;
            }
        }
    }
}
</style>
