import React, {Component} from "react";
import {Card, Icon, List} from 'antd'

import LinkButton from "../../compones/Link-button";
import {BASE_IMG_URL} from "../../utils/constants";
import {reqCategory} from '../../api'

const Item = List.Item;
export default class ProductDetail extends Component {
    state = {
        cName1: '', // 一级分类名称
        cName2: '', //二级分类名称
    }

    async componentDidMount() {
        const {pCategoryId, categoryId} = this.props.location.state;
        console.log(pCategoryId, categoryId)
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId)
            const cName1  = result.data.name
            console.log(cName1,'--------------')
        } else {
            console.log('二级分类')
            const result1 = await reqCategory(categoryId)
            const result2 = await reqCategory(pCategoryId)
            const cName1 =  result1.data.name
            const cName2 = result2.data.name
            console.log(cName1,cName2)
            this.setState({
                cName1,
                cName2
            })

        }
    }

    render() {
        //读取携带过来的state数据
        const {name, desc, price, detail, imgs} = this.props.location.state;
        console.log(this.props.location.state)
        console.log(name)
        const {cName1,cName2} = this.state;
        //  console.log(name,'------------------------')
        const title = (
            <span onClick={() => this.props.history.goBack()}>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{
                            marginRight: 15,
                            color: 'green', fontSize: 20
                        }}
                    />
                </LinkButton>
               <span>商品详情</span>
           </span>
        )
        return (
            <Card title={title}>
                <List className='ProductDetail'>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span className='right'>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span className='right'>{desc}</span>
                    </Item>

                    <Item>
                        <span className='left'>商品价格：</span>
                        <span className='right'>{price}元</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span className='right'>{cName1}{cName2?'--->'+cName2:' '}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span className='right'>
                            {/*每一个遍历需要携带key*/}
                            {imgs.map(img => (
                                <img
                                    key={img}
                                    className='product_img'
                                    src={BASE_IMG_URL + img}
                                    alt='img'/>
                            ))}

                        </span>
                    </Item>
                    <Item>
                        <span>商品描述：</span>
                        <span
                            dangerouslySetInnerHTML={{__html: detail}}
                        />
                    </Item>
                </List>
            </Card>
        )
    }
}