/*
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
 */
// import axios from 'axios'
import ajax from "./ajax";
import jsonp from 'jsonp'
import {message} from "antd";

const BASE = '';
// const BASE ='';
/*
登陆
 */
export const reqLogin=(username,password)=> ajax(BASE+'/login',{username,password},'POST');


//获取分类一级和二级列表
export const reqCategorys= (parentId)=> ajax(BASE+'/manage/category/list',{parentId});
//添加分类
export const reqAddcategorys = (categoryName,parentId)=>ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST');
//更新分类   在在括号里边的意思是必须传入的参数必须是对象
export const reqUpadatecategorys = ({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST');
//获取分类名称
export const reqCategory = (categoryId) =>ajax(BASE+'/manage/category/info',{categoryId})
//获取商品分页（）
export const reqProducts = (pageNum,pageSize)=> ajax(BASE+'/manage/product/list',{pageNum,pageSize});
/*搜索商品分页列表(根据商品名称)
      ssercharhType：搜索的类型， productsName/productsDesc
 */
//获取所有角色
export const reqRoles = () => ajax(BASE+'/manage/role/list')
/*
添加用户
 */
export const reqAdduser=(roleName)=> ajax(BASE+'/manage/role/add',{roleName} ,'POST');
//更新角色


export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType })=> ajax (BASE+'/manage/product/search',{
    pageNum,
    pageSize,
    [searchType] :searchName
    });
//搜索商品分页列表(根据商品名描述)

//删除商品图片
export const reqDeleteImg = (name) => ajax(BASE+'/manage/img/delete',{name},'POST')

//添加商品
export const reqAddOrUpdateProduct = (product)=>ajax(BASE+'/manage/product/'+(product._id?'update': 'add'),product,'POST')

//更新商品
export const reqUpdateProduct = (product)=>ajax(BASE+'/manage/product/update',{product},'POST')
/*
获取天气信息  用jsonp请求的接口函数
 */
export const reqWeather =  (city) => {
    return new Promise(((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?parameters&key=a5b553e7a7cc0beb007feacd9ae68756&city=${city}&extensions=base&output=json`
        //发出jsonp请求
        jsonp(url,{},(err,data)=>{
            console.log('天气信息请求成功');
            if(!err && data.status ==='1'){
                const {weather,city} = data.lives[0];
                resolve({weather,city})
            }else {
               message.error('获取天气信息失败')
            }

        })
    }))

};
// reqWeather('410700');
/*
Jsonp解决ajax跨域的原理
1)。json只能解决GET类型的ajax请求跨域问题
2)。 Jsonp请求不是aax请求，而是一般的get请求
3)。基木原理
浏览器端：
动态生成< script>来请求后台接口(src就是接口的ur1)
定义好用于接收响应数据的函数(fn)，并将函数名通过请求参数提交给后台(如：ca1back=fn)
服务器端
接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
浏览器端
收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据
*/