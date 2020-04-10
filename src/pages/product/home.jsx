import React, {Component} from "react";
import {Button, Select, Input, Icon, Card, Table} from 'antd'

import LinkButton from "../../compones/Link-button";
import {reqProducts, reqSearchProducts} from "../../api";
import {PAGE_SIZE} from "../../utils/constants";


const Option = Select.Option
export default class ProductHome extends Component {

    state = {
        total:0,//商品总数量
        products: [],//商品数组
        loding:false,
        searchName:'', //搜索的关键字
        searchType:'productName' ,//根据哪个字段搜索

    };
//初始化列表
    initcolumns = () => {
        this.columns = [
            {
                width:200,
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                width:500,
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                render: (price) => '￥' + price

            },
            {
                width:100,
                title: '状态',
                dataIndex: 'status',
                render: () => {
                    return (
                        <span>
                          <Button type='primary'>下架</Button><br/>
                        在售
                        </span>
                    )
                }
            },
            {
                width:100,
                title: '操作',
                render: (product)=> {
                    // console.log(product,'-----------')
                    return (
                        /*将product对象使用state传递给目标路由组件*/
                        <span>
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',product)}>详情</LinkButton><br/>
                            <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    };
//获取指定页码
    getProducts =  async (pageNum)=>{
        this.setState({loding:true});//显示logding
        let result;
        const {searchName,searchType} = this.state;
      //将loding转换为flase  不显示
        this.setState({loding:false})
        //如果搜索关键字有值，说明我们要搜索分页
        if(searchName){
            //取出分页数据,更新状态，显示分页列表
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType });
        }else {
            result = await reqProducts(pageNum,PAGE_SIZE);
            console.log(pageNum,PAGE_SIZE,'pageNum')
        }
        //
        if (result.status===0){
            const {list,total} = result.data;
            this.setState({
                total,
                products:list,
            })
        }

    };
    //组件加载之前使用
    componentWillMount() {
        this.initcolumns()

    }
    componentDidMount() {
        this.getProducts(PAGE_SIZE)

    }



    render() {
        //取出商品的数据
        const {products,total,loding,searchName,searchType} = this.state;
        const title = (
            <span>
              <Select
                  value={searchType}
                  style={{width: 150}}
                  onChange={value =>
                      this.setState({searchType:value})}
              >
                  <Option value='productName'>按名称搜索</Option>
                  <Option value='productDesc'>按内容搜索</Option>
              </Select>
              <Input
                  placeholder='关键字'
                  style={{width: 150, margin: '0 10px'}}
                  value={searchName}
                  onChange={event => (this.setState({searchName: event.target.value}))}
              />
              <Button
                  type='primary'
                  onClick={()=>this.getProducts(1)}
              >搜索</Button>
          </span>
        );
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
                <Icon type='plus'/>
                添加商品
            </Button>
        );

        return (

            <Card
                title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    loading={loding}
                    dataSource={products}
                    bordered
                    pagination={{
                        total,
                        defaultPageSize:PAGE_SIZE,
                        showQuickJumper:true,
                        onChange:this.getProducts
                    }}
                    columns={this.columns}/>
            </Card>


        )
    }
}