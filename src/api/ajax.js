/*
发送异步ajax 请求函数模块
封装axios库
函数的返回值是promise对象
1 优化 统一处理请求的异常
  在外层包一个自己创建的promise 对象
  在请求出错时，不reject（error），而是显示错误提示
* */
import axios from 'axios'
import {message} from 'antd'


export default function ajax(url,data={},type='GET') {
    return  new Promise((resolve,reject)=>{
        let promise;
        if(type==='GET'){
            promise = axios.get(url,{ //配置对象
                params:data //指定请求的参数
            })
        }else {
            promise= axios.post(url,data)
        }
      promise.then(reponse=>{
          //如果成功了
        resolve(reponse.data)
          // message.success('请求成功')

      })//如果失败了
          .catch(error=>{
              message.error('请求失败',error.message)
      })
})
}

//请求登陆接口
// ajax('/login',{username:'tom',password:'123456'},'POST').then();
// ajax('/manage/user/add',{username: 'Tom',password:'123456',phone:'18338997038'}).then();