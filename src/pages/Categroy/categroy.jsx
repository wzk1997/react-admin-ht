import React, {Component} from "react";
import {
    Button,
    Card,
    Icon,
    message,
    Table,
    Modal
} from "antd";

import LinkButton from "../../compones/Link-button";
import {reqCategorys, reqUpadatecategorys, reqAddcategorys} from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";


export default class Categroy extends Component {
    state = {
        loading: false,  //是否正在获取数据
        categorys: [],   //一级分类列表
        subCategorys: [],  //二级分类列表
        parentId: '0',//当前需要显示的分类列表的父分类ID
        parentName: '',//当前需要显示的分类列表的父分类名称
        showStatus: 0,//b标识添加/确认的是否显示 0: 都不显示  1：显示添加 2：显示更新

    };

    //显示添加
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    };
    //修改
    showUpdate = (category) => {
        //保存分类对象
        this.category = category;
        this.setState({
            showStatus: 2
        })
    }

    //隐藏
    handleCancel = () => {
        //清除输入数据
        this.form.resetFields();
        //隐藏对话框
        this.setState({
            showStatus: 0
        })

    };
    //添加分类
    addCategory =  () => {
        //进行表单验证
        this.form.validateFields(async(err,values)=>{
            console.log(values)
            if (!err){
                //隐藏确认框
                this.setState({
                    showStatus: 0
                });
                //获取数据
                const {parentId, categoryName} = values;
                // console.log(parentId, categoryName, '------');
                this.form.resetFields();
                const result = await reqAddcategorys(categoryName, parentId);
                console.log(result)
                if (result.status === 0) {
                    //添加的分类是当前的分类
                    if (parentId === this.state.parentId) {
                        //重新获取当前显示分类
                        this.getCategory()
                    } else if (parentId === '0') {//在二级分类列表添加一级分类项，重新获取一级分类列表
                        this.getCategory('0')
                    }

                }
            }
        });

    };
    //更新
    updateCategory = () => {
        // console.log('更新分类')
        //进行表单验证，只有通过了才处理
        this.form.validateFields(async (err, values) => {
            if (!err) {
                console.log(values,'----');
                //隐藏确定框
                this.setState({
                    showStatus: 0
                });
                //准备数据
                const categoryId = this.category._id;
                const {categoryName} = values;
                // console.log(categroyName,'*-*-*-*');
                //清除输入数据
                this.form.resetFields();
                //发请求更新分类
                const result = await reqUpadatecategorys({categoryId, categoryName});
                if (result.status === 0) {
                    //重新显示列表
                    this.getCategory()
                }
            }
        })

    };
    /*
    初始化table所有的列的数组
     */
    initColums = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',  //查看属性对应的属性名
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => {
                            this.showUpdate(category)
                        }}>修改分类</LinkButton>
                        {/*如何向事件回调函数传递参数:先定义一个匿名函数，在函数中调用处理的函数并传入数据*/}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => {
                            this.showSubCategorys(category)
                        }}>查看子分类</LinkButton> : null}

                    </span>
                )
            }

        ];
    };
    //异步获取一级或者二级列表显示
    //parentId:如果没有指定根据状态中的parentId请求，如果指定了根据指定的请求
    getCategory = async (parentId) => {
        //在请求前获，显示loding
        this.setState({loading: true});
        parentId = parentId || this.state.parentId;
        //发异步ajax请求 获取数据
        const result = await reqCategorys(parentId);
        //请求完成后隐藏loding
        this.setState({loading: false});
        if (result.status === 0) {
            //取出分类数组（可能是一级也可能是二级）
            const categorys = result.data;
            if (parentId === '0') {
                //更新一级分类列表
                this.setState({
                    categorys
                })
            } else {
                //更新二级分类列表
                this.setState({
                    subCategorys: categorys
                })
            }

            // console.log(categorys)
        } else {
            message.error('请求出错')
        }
    };
    //显示指定一级分类对象的列表
    showSubCategorys = (category) => {
        //先更新状体
        this.setState(
            {
                parentId: category._id,
                parentName: category.name
            }, () => { //在状态更新重新runder()之后执行
                // console.log('--',this.state.parentId);
                this.getCategory()
            });
        //setstate 之后不能立即获取状态 因为setstate是异步更新状态的
        // console.log('--',this.state.parentId);


    };
    //显示以及分类列表
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    };

    //组件么有渲染到组件前的时候加载
    componentWillMount() {
        this.initColums()
    }

    //组件渲染完成之后使用   一般发送异步请求的时候使用  执行异步任务  发ajax请求
    componentDidMount() {
        //获取一级分类列表
        this.getCategory()

    }


    render() {
        //读取状态数据
        const {categorys, logding, parentId, parentName, subCategorys} = this.state;
        //读取指定分类
        const category = this.category || {};
        console.log(category);
        // console.log(categorys)
        const title = parentId === '0' ? '一级列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type='arrow-right' style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        );
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type="plus"/>
                添加
            </Button>
        );
        //获取分类状态
        const {showStatus} = this.state;
        return (
            <div>
                <Card title={title} extra={extra} className='categroy'>
                    <Table
                        bordered
                        dataSource={parentId === '0' ? categorys : subCategorys}
                        columns={this.columns}
                        rowKey='_id'
                        loading={logding}  //载入时候得动画
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}  //设置分页
                    />
                </Card>
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    keyboard={parentId}
                    onCancel={this.handleCancel}

                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form) => {
                            this.form = form
                        }}

                    />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}

                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryName={category.name}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
            </div>
        )
    }
}