import axios from 'axios'

function get(url, params={}){
    return new Promise((resolve, reject)=>{
        axios.get(url, {
            // baseURL: 'http://localhost:8080',
            params: {
                ...params,
                _: new Date().getTime()
            }
        })
        .then(({data, status})=>{
            if(status === 200 && data.status === 0){
                //请求成功
                resolve(data);
            }else{
                //请求失败
                console.log('请求失败');
                console.log(error);
            }
    
        })
        .catch(error=>{
            //请求失败
            console.log('请求失败');
            console.log(error);
        })
    }) 
}

export default {
    get
}