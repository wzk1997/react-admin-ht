import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from "./pages/login/login";
import admin from "./pages/admin/admin";

/*
应用跟组件
 */
export default class App extends Component{

    render() {
        let obj={name:'jspang',skill:'web'};
        let age=Symbol();
        obj[age]=18;
        for (let item in obj){
            console.log(obj[item]);
        }
        console.log(obj);
        //  render 返回的是一个虚拟dom对象
      return(
          <div>
              <BrowserRouter>
                  <Switch> {/*只匹配其中一个*/}
                      <Route path='/login' component={Login} />
                      <Route path='/' component={admin} />
                  </Switch>
              </BrowserRouter>

          </div>
      )
    }

}
/*

var  是一个变量 这是es5的写法   var 是全局的
let  也是一个变量 这是es6的写法 要注意  以后要用这一种的  let 是局部的  为什么要用let的 应为这样可以做可以防止你的数据污染
const  是一个常量 可以理解为一个不变的量   以后业务中如果
数组遍历的方法 for, forEach, for…in, for…of
新增的一些方法
forEach     .map()


 数组的解构赋值
    数组模式和赋值模式统一
     =号左右两边的形式要统一 不同意的话会结构失败哦  如果不统一 可能会出现undefined或直接报错
    还可以给变量名成定义一个默认的属性 如 let [a,b='word'] = ['halou'] conslo.log(a+b)    这时候就会打印  halouword  现在我们对默认值有所了解，需要注意的是undefined和null的区别。
                                     如 let [a,b='word'] = ['halou'，undefined] conslo.log(a+b)    时候就会打印  halouword  undefined相当于什么都没有还是显示当时给的默认值
                                       如 let [a,b='word'] = ['halou'，null] conslo.log(a+b)    时候就会打印  halo unull  null相当于有值，值为null 所以解构成了null
对象的解构赋值
    let {foo,bar} = {foo：abc，bar：def}  conslo.log（foo+bar）  会打印出来 abcdef
    圆括号的使用
    let foo； {foo} ={foo:jspang} console.log(foo) 这时候会报错  解决报错的方法  就是加上圆括号  如 ({foo} ={foo:'JSPang'});
    字符串解构
    字符串也可以解构，这是因为，此时字符串被转换成了一个类似数组的对象。
    const [a,b,c,d,e,f]="JSPang"; console.log(a); 这是会打印 a
扩展运算符  rest  他们都是三个点...
可以传入多个值 并且不会报错   例如 function jspang(...arg){
    console.log(arg[0]);
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);

}
jspang(1,2,3);
            打印的是 1，2，3  undefined  这是也不会报错
rest 运算符最简单的用法也是用...来表示
      function jspang(first,...arg){
        console.log(arg.length);
    }
    jspang(0,1,2,3,4,5,6,7);  这时候打印出来了7    循环 rest 运算符 用for  of    用法  function jspang(first,...arg){
                                                                                        for(let val of arg){
                                                                                            console.log(val);
                                                                                        }
                                                                                    }

                                                                                    jspang(0,1,2,3,4,5,6,7);  这是打印出来的是1-7  这就相当于遍历了一次数组
字符串模板用的是`` 对html标签支持  如 let blog= `haha<div>haha</div></br>`  对运算符支持 let a=1 let b=2 let result=`${a+b}`  但是如果想要增加let const 等常量的时候需要加上${变量}
字符串查找 ES5例子    let a = '哈哈'
                     let b = '在这哈哈123'
                     console.log(b.indexOf(a))  es5想要判断是否存在还是自己进行判断   es6改善了这种方法 一个是判断开头是否存在 startWith()  一个是判断末尾是否存在 endWith()  判断是否存在includes（）  复制字符串 repeat（里面填的是要复制几次）
数字的判断和验证
例子  let a = 12/4
console.log(Number.isFinite(a));//true 只要是数字都会返回True  不管是整形 还是浮点
NaN是特殊的非数字，可以使用Number.isNaN()来进行验证  判断是否是整数 Number.isInteger(a)  整形转换  parserInt(a) 浮点转换  parserFloat(a)  将会转换为浮点类型

//最大安全整数   整数操作是有范围的就是2的53次方   在我们计算时候会经常超出这个数值 ES6提供了一个常数 这样以后就不需要我们计算了
        console.log(Number.MAX_SAFE_INTEGER)  //这个是最大安全整数
        console.log(Number.MIN_SAFE_INTEGER) // 这是最小安全整数

        let a = Math.pow(2,53)-1;
        console.log(Number.isSafeInteger(a))  //安全整数判断
        console.log(a)
        //json 的数组格式  使用Array.from(xxx) 来进行转换   json数组格式 ：左边的引号里面不能有空格
        let json = {
            '0':'jspang',
            '1':' 技术胖 ',
            '2': '大胖逼逼叨',
            length:3
        }

        let c = Array.from(json);
        console.log(c);
        //Array.of() 是将一堆文本或者变量，对象转换为数组或
        let arr = Array.of(3,4,5,6,7,8);
        let b = {a:111,b:222}
        let arr1= Array.of(b);
        console.log(arr1)
        //find()实例方法  传入三个参数   value表示当前查找的值 index表示当前查找的数组索引 arr表示当前的数组
        let linnst=[1,2,3,4,5,6,7,8];
        console.log(linnst.find(function (value,index,arr) {
                return value <5
        }))
        //fill() 实例方法  传三个参数  填充的变量   填充的位置 填充到的位置
        let  arr3 =[0,1,2,3,4,5,6,7,8,9]
        arr3.fill('aaa',0,1)
        console.log(arr3)
      //  render 返回的是一个虚拟dom对象
        //for of 循环
        let arr4=['jspang','技术胖','大胖逼逼叨']
        // 在输入循环的数组变量后面加入 .keys() 这样就可以 看到数组的索引了
        for (let item of arr4.keys()){
            console.log(item);
        }
        //在需要循环的数组变量 使用 entires() 实例方法  这样可以显示 索引和值
        let arr5= ['jspang','技术胖','大胖逼逼叨'];
        for(let [index,val] of arr5.entries()){
            console.log(index,val)
        }
        //entires（）生成的是一个lterator 形式的数组 这种形式的数组 可以让我们在需要时 用next()手动跳转到下一个值      return(
        let arr6= ['jspang','技术胖','大胖逼逼叨'];
        let items1 = arr6.entries();
           console.log( items1.next(2).value);
           console.log( items1.next(2).value);
        function haha(a,b) {
            return a+b;

        }
        console.log(haha(1,2));
        //使用throw new Error 就可以主动抛出错误
        // function fdd(a,b=1) {
        //     if (a == 0){
        //         throw new Error('报错了')
        //     }
        //     return a+b;
        // }
        // console.log(fdd(0));
        function add(a,b){
            'use strict'
            if(a == 0){
                throw new Error('This is error');
            }
            return a+b;
        }

        console.log(add(1,2));
        //获得需要传递的参数个数
        function add(a,b){
            'use strict'
            if(a == 0){
                throw new Error('This is error');
            }
            return a+b;
        }

        console.log(add.length);
对象的结构赋值
后端传递接口的时候经常是json的结构的   前端的话就是将json格式数据当作参数,传递到函数内部进行处理  ees6就是提供了这样的结构赋值
例子
let json = {
    a:'jspang',
    b:'技术胖'
}
function fun({a,b='jspang'}){
    console.log(a,b);
}
fun(json);   这样的话 就是直接将  json数据传递到了函数提内部
=
数组的结构赋值的话  是 用...来表示

in 是用来进行判断的  1、对对象的判断
                    let obj = {
                        a:'aaa',
                        b:'bbb'
                        }
                        conslo.log('a' in obj)


                    2.对数组的判断   例如 let a = [,,,,] console.log(a)  // 5  数组里面的元素明显是空的 这时候显示的是5 这明显是不对的
                    es6的in就可以解决这个问题
                    let a= [,,,,,]
                    console.log(0 in a )  //false   注意 0指的是数组下标位置是否为空
                    let arr1=['jspang','技术胖'];
                    console.log(0 in arr1);  // true
数组的遍历方法
forEach 循环的特点是会自动省略为空的数组元素,相当于直接给我门筛空
   filter    过滤函数，返回符合条件的元素数组   例如 let a=[1,2,3.4,5]  a.filter(function dd(value){
                                                                                    return value > 5})
     some  一真即真  le
     every 一假即假
        例子：let arr=[
            {name:'jspang',rar:10,acer:14},
            {name:'jspang',rar:12,acer:31}
            ];

       let b =  arr.every(function (arr) {
                return arr.rar>11
        });
       console.log(b)
       let c =  arr.some(function (arr) {
                return arr.acer>11
        });
       console.log(c）

        map 他是起到一个替换的作用
          join 实在数组元素中间加了一些间隔   相当于集合一些东西 如 let a = [1,2,3]  a.join('b')  console.log(a)  将会在他们的间隔内增加b
              tostring()  转换时只是是用逗号隔开了。
ES6中的对象  对象赋值  允许把声明的变量直接赋值给对象
             对象key值构建  。比如我们在后台取了一个key值，然后可以用[ ] 的形式，进行对象的构建。
             自定义对象方法  对象方法就是把兑现中的属性，用匿名函数的形式编程方法
             例子  var obj = {
             add:function(a,b){
             return a+b;
             }
             }
             console.log(obj.add(1,2))
               object.is()对象比较
               以前对象比较直 是用===   var obj1 = {name:'jspang'}; var obj2 = {name:'jspang'}; console.log(obj1.name === obj2.name)
                   object.is比较方法   console.log(objects.is(obj1,obj2))
                   object.is 是严格相等    === 是同值相等 是不严格的模式

                   object.assign()合并对象
                   var a = {1}
                   var b = {2}
                   var c = {3}
                   let d = object.assgin(a,b,c)
                   set和weakSet数据结构
                   set 是对数组的增删查   set.has()查  set.add()增  set.delect（）删除  set.clear()删除
                   weakSet是对对象的增删查  weakSet


 */