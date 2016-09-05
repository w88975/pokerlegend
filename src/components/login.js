/**
* @Author: KamiSama
* @Date:   2016-08-29T14:05:52+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T17:49:23+08:00
*/



import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'
import { Input, Icon, notification } from 'antd'
import $ from 'jquery/dist/jquery'

import '../styles/form.scss'


export default class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.style = {
            marginTop: '50px'
        }
    }
    componentDidMount() {
        PubSub.publish('hideLayout',false)
        PubSub.publish('updateTitle','登录')
    }
    componentWillUnmount(){
        PubSub.publish('hideLayout',true)
    }
    handleClick = () =>  {
        var s = this.state;
        if (!s.user || !s.pwd) {
            return notification['error']({
                message: '错误提示',
                description: '请输入完整的账号密码!',
            });
        }
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: JSON.stringify({
                u: s.user,
                p: s.pwd
            }) ,
            dataType: "json",
            success: function(data){
                if (data.code === 200) {
                    window.location.href = "/#/records"
                } else {
                    return notification['error']({
                        message: '登录失败',
                        description: '请检查账号密码是否输入正确!',
                    })
                }
            },
            error: function(e) {
                return notification['error']({
                    message: '登录失败',
                    description: '网络异常!'
                });
            }
        })

    }
    userChange = (e) => {
        this.setState({
            user: e.target.value
        });
    }
    pwdChange = (e) => {
        this.setState({
            pwd: e.target.value
        });
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
            <div className="ani-box" key="a" style={this.style}>
                    <h1>德扑神器</h1>
                    <div className="ant-col-24">
                        <div className="pkl-form-group">
                            <div className="pkl-input-group pkl-input-group-line">
                                <Icon type="user" className="login_icon"/>
                                <input placeholder="账号" onChange={this.userChange} value={this.state.user} type="text" />
                            </div>
                            <div className="pkl-input-group">
                                <Icon type="lock" className="login_icon"/>
                                <input placeholder="密码" onChange={this.pwdChange} value={this.state.pwd} type="password" />
                            </div>
                        </div>
                        <button className="pkl-cus-btn-red" onClick={this.handleClick}>登录</button>
                        <Link to="/verifyCode" query={{type: 'register'}}><button className="pkl-cus-btn">注册</button></Link>
                        <br/>
                        <Link to="/">忘记密码</Link>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
