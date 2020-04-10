import React, {Component} from "react";
import {Form, Input} from 'antd';
import {PropTypes} from  'prop-types'
/*
添加分类动的form组件
 */

const Item = Form.Item

class UpdateForm extends Component {
    static propTypes = {
        categoryName : PropTypes.string.isRequired,
        setForm : PropTypes.func.isRequired
    };
    componentWillMount() {
        //将Form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form)
    }

    render() {
        const {categoryName} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <Item>
                    {getFieldDecorator('categoryName',{
                        initialValue: categoryName,
                        rules:[
                            {required:true,message:'分类名必须输入'}
                        ]
                    })(
                        <Input placeholder='请输入分类名称'/>
                    )}

                </Item>

            </Form>
        )
    }
}

export default Form.create()(UpdateForm)