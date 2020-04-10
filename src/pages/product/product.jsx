import React, {Component} from "react";
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductAddUpdta from './addupdate'
import ProductHome from './home'
import ProductDetail from './detail'
import './product.less'

export default class Product extends Component {


    render() {
        return (
            <div>
                <Switch>
                    <Route path='/product' component={ProductHome} exact/>
                    <Route path='/product/detail' component={ProductDetail} />
                    <Route path='/product/addupdate' component={ProductAddUpdta}  />
                    {/*<Route path='/product/detail' component={ProductDetail}  />*/}
                    <Redirect to='/product'/>
                    
                </Switch>
            </div>
        )
    }
}