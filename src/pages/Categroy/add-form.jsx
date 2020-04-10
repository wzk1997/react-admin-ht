import React, {Component} from "react";
import PropTypes from 'prop-types'
import {Form, Select, Input} from 'antd'
/*
添加分类动的form组件
 */
const Option = Select.Option
const Item = Form.Item

class AddForm extends Component {

    static propTypes = {
        setForm:PropTypes.func.isRequired,     //用来传递Form
        categorys:PropTypes.array.isRequired,      //接受一级列表
        parentId:PropTypes.string.isRequired,    //接受父分类ID
    };

    componentWillMount() {
        //将Form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const {categorys,parentId} = this.props;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类列表</Option>
                                {
                                    categorys.map(c => <option value={c._id}>{c.name}</option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {getFieldDecorator('categoryName',{
                        initialValue: '',
                        rules:[
                            {required:true,message:'必须输入分类名'}
                        ]
                    })(
                        <Input placeholder='请输入分类名称'/>
                    )}

                </Item>

            </Form>
        )
    }
}

export default Form.create()(AddForm)