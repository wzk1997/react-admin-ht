import React, {Component} from "react"
import {Redirect} from 'react-router'
import {Button, Checkbox, Form, Icon, Input, message} from 'antd'

import logo from '../../assets/image/OA.png'
import './login.less'
import {reqLogin} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import striregUtils from "../../utils/striregUtils";
/*
登陆路由组件
数组是以下标做名称
 */
const Item = Form.Item;

class Login extends Component{

    //事件回调函数需要传入event
    handleSubmit=(event)=>{
        //阻止默认事件
        event.preventDefault();
        //对表单进行验证
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                // console.log('提交ajax请求',values)
               const {username,password} = values;
               try {
                   const propims= await reqLogin(username,password);
                   console.log(propims);

                   if(propims.status===0){
                        message.success('登陆成功'); //跳转到管理界面
                       //保存user
                       const user = propims.data;
                       memoryUtils.user= user; //保存在内存中
                       striregUtils.saveUser(user);
                       this.props.history.replace('/');

                   }else {
                       message.error('账号或密码错误')
                   }
               }catch (e) {
                   console.log('请求失败')
               }

            }else{
                console.log('校验失败')
            }
        });
        //得到form 对象

       const form = this.props.form;
       const value = form.getFieldsValue();
       console.log('value',value)
    };
    validatorPwd=(rule, value, callback)=>{
        if (!value){
            callback('密码必须输入')
        }
        else if (value.length<4){
            callback('密码必须大于四位')}
        else if(value.length>12){
            callback('密码必须小于十二位')
        }
        else {
            callback()
        }
    };
    render() {
        const user = memoryUtils.user;
        if(user._id){
            return <Redirect to='/admin'/>
        }
        //得到强大的form对象

        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login'>
               <header className='login-header'>
                   <img src={logo} alt="logo" style={{'height':'20'}}/>
                   <h1>react项目：后台管理系统</h1>
               </header>
                <section className='login-content'>
                    <h2>用户登陆</h2>
                     <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                        {/*getFieldDecorator 这一个高阶组件*/}
                        {
                            getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '请输入用户名' },
                                    { min: 4, message: '最少输入四位' },
                                    { max: 12, message: '最长12位' },
                                    { pattern: /^[a-zA-Z0-9]+$/, message: '必须是大写' }
                                    ],
                            })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="username"
                                        placeholder="用户名"
                                    />
                            )
                        }

                    </Item>
                    <Item>
                        {
                            getFieldDecorator('password',{
                                rules:[
                                    {
                                        validator : this.validatorPwd
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码"
                                />
                            )
                        }

                        <Checkbox>Rememberme</Checkbox><br/>

                    </Item>

                    <Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>

                    </Item>
                </Form>

                </section>
            </div>
        )
    }
}
/*
1。高阶函数
 （1.） 类贴别的函数
    a 接受函数类型的参数
    b 返回值是函数
    2. 常见
    定时器函数：setTimeout  /setInterval（）
    b promise :promise(()=>{}) then(value=>{},reason=>{})
    c.数据遍历相关的方法 ： forEach()/filter()/map()/reduce()/findIndex()
2.告诫组件

包装Form组件生成个新的组件 ：from（Login）
新组件会通过form组件出第一个强大的对象属性 form
新组建回想form传递一个强大的对象 ， form对象


* */
const WarpLogin = Form.create()(Login);

export default WarpLogin
/*
前台表单验证
收集表单输入数据*/

/*
async 和await？
1. 作用
简化promise对象的使用：不用再使用then()来指定失败的回调函数
已同步编码（没有回调函数了）方法实现异步流程
2.哪里写await？
在返回promise的表达式左侧写await： 不想要promise ，想要promise 异步执行的成功的value数据
3.哪里写 async
 await 所在函数（最近的）定义的左侧写aysnc
 */