import React, {Component} from "react";

import {Switch,Route,Redirect} from "react-router-dom";

import {Layout} from 'antd';

import memoryUtils from "../../utils/memoryUtils";
import './index.less'
import LeftNav from "../../compones/Left-nav";
import Header from '../../compones/header/index'
import Home from "../home/home";
import Cetegroy from '../Categroy/categroy';
import Bar from "../charts/bar";
import Lines from "../charts/line";
import Pie from "../charts/pie";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";

/*
后台管理的路由组件
 */
const {Content, Footer, Sider} = Layout;
export default class Admin extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        //如果内存中没有存储user ==> 说明当前没有登陆
        const user = memoryUtils.user;
        if (!user.username || !user._id) {
            return <Redirect to='/'/>  // 在render里面一定要runturn
        } else {
            console.log('登陆成功')
        }
        // console.log(user)
        return (

            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout >
                    <Header>herader</Header>
                    <Content  style={{margin:'20px',backgroundColor:'#ffffff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/user' component={User}/>
                            <Route path='/categroy' component={Cetegroy}/>
                            <Route path='/charts/line' component={Lines}/>
                            <Route path='/charts/Bar' component={Bar}/>
                            <Route path='/charts/Pie' component={Pie}/>
                            <Route path='/Categroy' component={Cetegroy}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/Role' component={Role}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer className={'footer'}>熙道服饰有限公司后台管理</Footer>
                </Layout>
            </Layout>
        )
    }
}