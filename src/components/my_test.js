/**
* @Author: KamiSama
* @Date:   2016-08-29T00:34:00+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   KamiSama
* @Last modified time: 2016-08-29T18:08:02+08:00
*/



import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'

export default class my_test extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            fontSize: '2rem'
        }
    }
    componentDidMount() {
        PubSub.publish('updateTitle','测试页')
    }
    render() {
        return (
            <div className="ani-box" style={this.style}>
                <h1>页面导航</h1>
                <Link to="/verifyCode">注册</Link><br/>
                <Link to="/verifyCode">修改密码</Link><br/>
                <Link to="/login">登录</Link><br/>
                <Link to="/">/</Link><br/>
            </div>
        )
    }
}
