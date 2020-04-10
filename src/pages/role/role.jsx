import React, {Component} from "react";
import {Button, Table, Card, Modal, message} from 'antd'


import {PAGE_SIZE} from "../../utils/constants";
import {reqRoles, reqAdduser} from "../../api";
import AddForm from './addform';
import Authform from "./authform";


export default class User extends Component {
    state = {
        roles: [], //角色列表
        role: [],   //存储点击的对象
        isShowAdd: false, //是否添加角色
        isShowAuth: false  //是否显示添加角色管理
    }
    initColumn = () => {
        this.coulmns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: `创建时间`,
                dataIndex: 'create_time'
            },
            {
                title: `授权时间`,
                dataIndex: 'auth_time'
            },
            {
                title: `授权人`,
                dataIndex: 'auth_name'
            },
        ]
    }
    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
                // alert('点击了')
            }
        }
    };
    getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 0) {
            const roles = result.data;
            this.setState({
                roles
            })
        }
        console.log(result)
    }
    //添加角色
    addRole = () => {
        //验证表单，只有通过才继续
        this.form.validateFields(async (errors, values) => {
            if (!errors) {
                //隐藏确认框
                this.setState({
                    isShowAdd: false
                })
                //收集数据
                const {roleName} = values
                this.form.resetFields()
                //请求添加
                const result = await reqAdduser(roleName)
                if (result.status === 0) {
                    message.success('添加角色成功')
                    //产生新角色
                    const role = result.data
                    //更新roles 状态

                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))

                } else {
                    message.error('添加角色失败')
                }
            }
        })
    }
    updateRole =()=>{

    }

    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        const {roles, role, isShowAdd, isShowAuth} = this.state;

        const title = (
            <span>
                <Button type='primary' onClick={() => {
                    this.setState({isShowAdd: true})
                }}>创建角色</Button>
                <Button
                    type='primary'
                    style={{marginLeft: '10px'}}
                    disabled={!role._id}
                    onClick={()=>{this.setState({isShowAuth: true})}}
                >
                    设置角色权限
                </Button>
            </span>


        );


        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    dataSource={roles}
                    bordered
                    onRow={this.onRow}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id]
                    }}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,

                    }}
                    columns={this.coulmns}/>
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                        this.form.resetFields()
                    }}

                >
                    <AddForm
                        setForm={(form) => {
                            this.form = form
                        }}

                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowAuth: false})
                    }}

                >
                    <Authform role={role}/>
                </Modal>
            </Card>
        )
    }
}