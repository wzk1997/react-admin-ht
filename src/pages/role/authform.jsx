import React, {Component} from "react";
import PropTypes from 'prop-types'
import {Form, Select, Input,t} from 'antd'
import role from "./role";
/*
添加分类动的form组件
 */
const Option = Select.Option
const Item = Form.Item

export default class Authform extends Component {

    static propTypes = {
    role : PropTypes.object
    };
    state = {

    }


    render(){
            const {role} = this.props
        const formItemLayout = {
            labelCol :{span:4},
            wrapperCol:{span:14}
        }
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                   <Input value={role.name} disabled/>
                    <Tree
                        checkable
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                    />
                </Item>
            </div>
        )
    }
}

