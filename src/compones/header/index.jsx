import React,{Component} from "react";
import {Icon,Modal} from "antd";
import {withRouter} from 'react-router-dom'

import './index.less'
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from  '../../utils/datautils'
import {reqWeather} from "../../api";
import menuList from "../../config/menuConfig";
import striregUtils from "../../utils/striregUtils";
import LinkButton from "../Link-button";


class _Header extends Component{
    constructor() {
        super();

        this.state = {
            currentTime:formateDate(Date.now()),
            dayPictureUrl:'',
            weather :''
        }
    }
    getTime=()=>{
      this.intarval =   setInterval(()=>{
            const currentTime = formateDate(Date.now());
            // console.log(currentTime)
            this.setState({currentTime})
            },1000)
    };
    getWeather = async ()=>{
        //调用接口请求
        const {weather} = await reqWeather('410700');
        console.log({weather});

        //
        this.setState({weather})
    };
    //获取标题
    getTile=()=>{
        //得到当前请求的路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item=>{
            //{/*如果当前的item对象的key与path一样，iten的tile 就是要显示的title*/}
            if(item.key===path){
                title = item.title
            }else if(item.children){
                //在所有的子item中查找匹配的
              const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if(cItem){
                    //取出他的title
                    title=cItem.title
                }
            }
           });
        return title

    };
    logoout= ()=> {
        Modal.confirm({
            content: '是否选择退出',
            okText:'是',
            onOk: () => {
                //删除已经记录的用户
                striregUtils.removeUser();
                memoryUtils.user={};
                //跳转到登陆界面
                this.props.history.replace('/login')
            },
        })
    };
    /*
    第一次render之后执行一次
    一般在此执行异步操作 发ajax请求 启动定时器
     */
    componentDidMount(){
        //获取当前的时间
        this.getTime();
        //获取当前天气
        this.getWeather()
    }
    //当前组件卸载之前使用
    componentWillUnmount() {
        clearInterval(this.intarval)
    }


    render() {
        //获取当前用户的名字
        const loginUser = memoryUtils.user.username;
        //获取天气信息
        const {weather,currentTime} = this.state;
        //获取当前需要现实的title
        const title = this.getTile()
        // console.log(title,'-----')

        return(
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{loginUser}</span>
                    <LinkButton onClick={this.logoout}>退出</LinkButton>
                </div>
                <div className='header-boottom'>
                    <div className='header-boottom-left'>{title}</div>
                    <div className='header-boottom-right'>
                            <span>{currentTime}</span>
                          <span className='header-boottom-cloud'><Icon type="ant-cloud" style={{ fontSize: '25px', color: '#08c' }} /></span>
                           <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(_Header)