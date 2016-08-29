/**
* @Author: KamiSama
* @Date:   2016-08-26T11:41:04+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   KamiSama
* @Last modified time: 2016-08-29T18:08:23+08:00
*/



import React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

// 引入主体样式文件
import './main.scss'

import layout from './components/layout.js'
import verifyCode from './components/sendVerifyCode.js'
import login from './components/login.js'
import my_test from './components/my_test.js'

// 引入Ant-Design样式 & Animate.CSS样式
import 'animate.css/animate.min.css'
// 配置导航
class Sider extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <myLayout></myLayout>
        )
    }
}


// 配置路由
render((
    <Router history={hashHistory} >
        <Route path="/" component={layout}>
            <IndexRoute path="/my_test" component={my_test} />
            <Route path="/my_test" component={my_test} />
            <Route path="/verifyCode" component={verifyCode} />
        </Route>
        <Route path="/login" component={login}/>
    </Router>
), document.getElementById('app'));
