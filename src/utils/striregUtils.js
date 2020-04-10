//所有 local将存储在这里
import store from 'store'

const usert_key = 'user_key';
export default {
    // 存储用户
    saveUser(user){
        // localStorage.setItem(usert_key,JSON.stringify(user))
        // store.set(usert_key,user)
        store.set(usert_key,user)
    },
    //获取用户
    getUser(){
        // return JSON.parse(localStorage.getItem(usert_key) || '{}') //json.parse 说明 由于从服务端接收过来的一般是字符串 所以要给他转换成js对象
        return store.get(usert_key) || '{}'
    },
    //删除用户
    removeUser(){
        localStorage.removeItem(usert_key)
    }
}