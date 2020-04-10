import React,{Component} from 'react';

/*
应用跟组件
 */
export default class App extends Component{
    constructor(props) {
      super(props);
    }
    render() {

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
               return(
        <div>helloword</div>
      )
    }

}