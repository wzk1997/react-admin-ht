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
        setForm : PropTypes.func.isRequired //传递form 对象
    };

    componentWillMount() {
        //将Form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol :{span:4},
            wrapperCol:{span:16}
        }
            return (
            <Form>

                <Item label='角色名称' {...formItemLayout}>
                    {getFieldDecorator('roleName',{
                        initialValue: '',
                        rules:[
                            {required:true,message:'必须输入角色名称'}
                        ]
                    })(
                        <Input placeholder='请输入角色名称'/>
                    )}

                </Item>

            </Form>
        )
    }
}

export default Form.create()(AddForm)