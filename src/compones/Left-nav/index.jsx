import React, {Component } from "react";
import {Link,withRouter} from "react-router-dom";

import './index.less'
import logo from '../../assets/image/logo.png'
import {Layout, Menu, Icon} from 'antd';
import menuList from "../../config/menuConfig";


const { Sider} = Layout;
const {SubMenu} = Menu;
class LeftNav extends Component {

    //这时候要渲染左边的列表
    //根据menulist中的数据数组生成对应的列表
    //使用map()+递归调用
    getMenulist_map = (menuList)=>{
            return menuList.map(item=>{
              if(!item.children){
                  return (
                      <Menu.Item key={item.key}>
                          <Link to={item.key}>
                              <Icon type={item.icom}/>
                              <span>{item.title}</span>
                          </Link>
                      </Menu.Item>
                  )
              }else {
                      return (
                          <SubMenu key={item.key} title={<span>
                                <Icon type={item.icom}/>
                                <span>{item.title}</span>
                            </span>}>
                              {/*这是一个递归函数*/}
                              {this.getMenulist(item.children)}
                          </SubMenu>



                  )
              }
          })
        };
    //这时候要渲染左边的列表
    //根据menulist中的数据数组生成对应的列表
    //使用redce()+递归调用  reduce这是用来累计累加的  reduce（） 传递两个参数 pre是上次统计的结果，一个是初始值
    getMenulist=(menuList)=>{
        // 要找到location   应为路径实在这里边存储的
      const path = this.props.location.pathname;
      console.log(path);
        return menuList.reduce(

            //redux 回调函数写法
            (pre,item)=>{
                console.log(item);
                // console.log(pre,'.....')
                if(!item.children){
                    pre.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icom}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                }else {
                        //获取到children里边的key是不是和路径相对应
                  const cItem = item.children.find(cItem => cItem.key===path);
                  console.log(cItem,'----');
                    // 如何cIem里面的路径和item里面的key 对应了  则在this.open里面添加item.ket
                    if(cItem){
                        this.openKey = item.key
                    }
                    pre.push(
                        <SubMenu key={item.key} title={<span>
                                <Icon type={item.icom}/>
                                <span>{item.title}</span>
                            </span>}>
                            {/*这是一个递归函数*/}
                            {this.getMenulist(item.children)}
                        </SubMenu>
                    )
                }
                return pre  //这个pre 是当前统计的结果作为下次统计的条件
        },[]) //reduce  后面必须传入一个你当时设定的数组格式
    };
    //在第一reder()之前执行一次
    //为第一个render()准备数据(必须同步的)
    componentWillMount() {
        this.menuNodes = this.getMenulist(menuList)
    }

    render() {
        // const menuNodes = this.getMenulist(menuList);
         //得到当前请求的路由路径 获取props 里面传递过来的三个属性 分别是 match  location  history
        const path  = this.props.location.pathname;
        //得到需要打开的菜单项的KEY
        const openkey = this.openKey;
        return (
            <div>
                <Link to='/' className='list_'>
                    <header className='left-an-header'>
                        <img src={logo} alt=''/>
                        <h1 style={{color: '#ffff'}}>后台管理</h1>
                    </header>
                </Link>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider>
                        <div className="logo"/>
                        <Menu theme="dark"
                              selectedKeys={[path]}
                              defaultOpenKeys={[openkey]}
                              mode="inline">

                            {this.menuNodes}
                           {/*
                           <Menu.Item key="0">
                                <Link to='/home'>
                                    <Icon type="home"/>
                                    <span>首页</span>
                                </Link>

                            </Menu.Item>
                            <SubMenu key='shop' title={<span>
                                <Icon type='shop'/>
                                <span>商品</span>
                            </span>}>
                                <Menu.Item key='/Product/prodcy'>
                                    <Link to='/Product/prodcy'>
                                        <Icon type="bars"/>
                                        品类管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/Product/Categroy'>
                                <Link to='/Product/Categroy'>
                                    <Icon type="key"/>
                                    商品管理
                                </Link>
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item key="/User">
                                <Link to='/user/User'>
                                    <Icon type="user"/>
                                    用户管理
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="safety">

                                <Link to='/role'>
                                    <Icon type="safety"/>
                                    <span>权限管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="bar-chart">
                                <Icon type="bar-chart"/>
                                <span>图形图表</span>
                            </Menu.Item>*/}
                        </Menu>
                    </Sider>
                </Layout>
            </div>


        )
    }
}
/*
* withRouter高阶组件
* 包装非路由组件。返回一个新的组件
* 新的组件向非路由组件传递3个属性 history  location  match
 */
export  default withRouter(LeftNav)