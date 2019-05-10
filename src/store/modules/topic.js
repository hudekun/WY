import request from '../../ajax/request'
import api from '../../ajax/api'
import { isContext } from 'vm';

const state = {
    topicList: []
}

const mutations = {
    setTopicList(state, params){
        state.topicList = params.value;
    }
}

const actions = {
    async requestTopicListData(context, {id}){
        let data = await request.get(api.TOPIC_LIST_API, {
            tabId: id
        });
        // 处理数据
        // 取得列表数据
        let arr = [];
        if(id === '9'){
            data.data.forEach(info=>{
                arr = [...arr, ...info.topics];
            })
        }
        else{
            arr = data.data.result;
        }
        // 过滤列表数据
        let newData = [];
        arr.forEach(item=>{
            let newItem = {
                type: item.type,
                id: item.topicId,
                picUrl: item.picUrl,
                title: item.title,
                subTitle: item.subTitle,
                avatar: item.avatar,
                nickname: item.nickname,
                readCount: item.readCount,
            };
            if(item.type === 7){
                let length = Math.floor(item.itemList.length / 4) * 4;
                if(length > 0){
                    let itemList = [...item.itemList].splice(0, length);
                    newItem.itemList = itemList.map((value)=>{
                        return {
                            id: value.itemId,
                            itemName: value.itemName,
                            itemUrl: value.itemUrl,
                            countPrice: value.countPrice,
                            retailPrice: value.retailPrice
                        }
                    })
                    newData.push(newItem);
                }
            }else{
                newData.push(newItem);
            }
        })
        // 赋值
        context.commit('setTopicList', {value: newData});

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}