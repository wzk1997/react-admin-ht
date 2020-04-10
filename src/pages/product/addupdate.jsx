import React, {Component} from "react";
import {
    Card,
    Icon,
    Input,
    Form,
    Cascader,
    InputNumber, Button, message
} from 'antd'

import LinkButton from "../../compones/Link-button";
import './product.less'
import {reqCategorys, reqAddOrUpdateProduct} from "../../api";
import PicturesWall from './PicturesWall'
import RichTextEditor from "./RichTextEditor";


const {Item} = Form;
const {TextArea} = Input;

class ProductAdd extends Component {
    state = {
        options: [],
    };

    constructor(props) {
        super(props);
        //创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef();
        this.editor = React.createRef()
    }


    initOptions = async (categorys) => {
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, //不是叶子
        }));
        // console.log(options,'options------');
        const {isUpdate, product} = this;
        console.log(product, 'product3')
        const {pCategoryId} = product;

        if (isUpdate && pCategoryId !== '0') {
            console.log('开始请求')
            const subCtegorys = await this.getCategorys(pCategoryId)
            console.log(subCtegorys,'-------------')
            //     //生成二级下拉列表option
            const chiledOptions = subCtegorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            console.log(chiledOptions, 'chiledOptions----')
            //     //找到对应option
            const targetOption = options.find(options => options.value === pCategoryId)
            console.log(targetOption, 'targetOption')


            //
            //     //关联到对应的options上去
            // targetOption.children = chiledOptions
        }
        this.setState({
            options
        })

    };
    //  异步获取一二级列表
    //async 函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId);
        console.log(parentId, 'result1')
        // debugger
        if (result.status === 0) {
            const categorys = result.data;
            //如果是一级分类列表
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                return categorys  //返回二级列表 ==》当前async函数返回的promsie 就会成功且value为categorys
            }
        }
    };

    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[0];
        // console.log(targetOption.value,'------------')
        targetOption.loading = true;
        //根据选择的分类获得二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        console.log(subCategorys, 'sub')
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            const childOption = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
            //关联到当前的option上
            targetOption.children = childOption

        } else { //当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        this.setState({
            options: [...this.state.options],
        });
    };


    submit = () => {
        //进行表单验证，通过发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //收集数据
                const {name, desc, price, categoryIds} = values;
                // console.log(name, desc, price, categoryIds,'-------------')

                let pCategoryId, categoryId;
                if (categoryIds.length === 1) {
                    pCategoryId = '0';
                    categoryId = categoryIds[0]
                } else {
                    categoryId = categoryIds[0];
                    pCategoryId = categoryIds[1]
                }
                const imgs = this.pw.current.getImgs();
                const detail = this.editor.current.getDetail();
                const product = {name, desc, price, imgs, detail, pCategoryId, categoryId};
                //如果更新，添加_id
                if (this.isUpdate) {
                    product._id = this.product._id
                }
                //接口添加或者更新
                const result = await reqAddOrUpdateProduct(product);
                //根据结果提示
                if (result.status === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品成功！`)
                    this.props.history.goBack()
                } else {
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品失败！`)
                }
            }
            // console.log(values,'values')
        })
    };
    //校验价格的自定义价格
    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            //通过
            callback()
        } else {
            callback('价格大于零')
        }
    };

    //加载之后使用
    componentDidMount() {
        this.getCategorys('0')
    }

    componentWillMount() {
        //去除state的数据
        const product = this.props.location.state;
        console.log(product, 'product1');
        // console.log(product, '-*-*-*-*-*')
        //保存是否更新的    两个非是强制转换布尔类型
        this.isUpdate = !!product;
        //保存商品   如果没有商品 保存一个空对象    避免报错
        this.product = product || {}
    }

    render() {
        //只能item布局的配置对象
        const {isUpdate, product} = this;
        console.log(product, 'product2');
        //产品对象

        // console.log(pCategoryId, categoryId, imgs, detail, '----', '----')

        const {pCategoryId, categoryId, imgs, detail} = product;
        //用来接收级联分类ID
        const categoryIds = [];
        console.log(pCategoryId, categoryId, 'pCategoryId')
        if (isUpdate) {
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(categoryId);
                categoryIds.push(pCategoryId)
            }
        }

        const formLablCol = {
            labelCol: {span: 1},  //左
            wrapperCol: {span: 8}  //右s
        };

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{marginRight: 5, color: 'green', fontSize: 20}}/>
                </LinkButton>
               <span>{isUpdate ? '修改商品' : '添加商品'}</span>
           </span>
        );
        const {getFieldDecorator} = this.props.form;

        return (
            <Card title={title} className='addupdate'>
                <Form {...formLablCol}>
                    <Item label='商品名称：'>
                        {getFieldDecorator('name', {
                            initialValue: product.name,

                            rules: [
                                {required: true, message: '必须输入商品名称'}
                            ]

                        })(<Input placeholder='请输入商品名称' style={{margin: '0px 30px'}}/>)}

                    </Item>
                    <Item label='商品描述'>
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [
                                {required: true, message: '必须输入商品描述'}
                            ]
                        })(<TextArea placeholder='请输入商品描述' style={{margin: '0px 30px'}} autoSize={{maxRows: 6}}/>)}

                    </Item>
                    <Item label='商品价格'>
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                {required: true, message: '请输入商品价格'},
                                {validator: this.validatorPrice}
                            ]
                        })(<InputNumber minLength={0} maxLength={10} placeholder='请输入上品价格'
                                        style={{width: 150, margin: '0px 30px'}}/>)}
                        元
                    </Item>
                    <Item label='商品分类'>
                        {getFieldDecorator('categoryIds', {
                            initialValue: categoryIds,
                            rules: [
                                {required: true, message: '请选择商品分类名称'},

                            ]
                        })
                        (<Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            placeholder="请选择商品分类"
                            style={{width: 200, margin: '0 30px'}}/>)}

                    </Item>
                    <Item label='商品图片' style={{paddingLeft: 11}}>
                        <PicturesWall ref={this.pw} imgs={imgs}/>


                    </Item>
                    <Item label='商品详情'
                          labelCol={{span: 1}}
                          wrapperCol={{span: 18}}
                          style={{paddingLeft: 11}}>
                        <RichTextEditor ref={this.editor} detail={detail}/>

                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAdd)
//栅格系统整个系统的宽度是24格
/*
    1.子组件调用父组件的方法：将父子间的方法以函数属性的形式传递给子组件，子组件就可以调用
    2.父组件调用子组件的方法：将子组件的方法以ref的方法传递给父组件
*/