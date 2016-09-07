/**
* @Author: kamisama
* @Date:   2016-08-31T16:41:57+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T17:48:28+08:00
*/



import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'
import { Input, Icon, notification } from 'antd'
import $ from 'jquery/dist/jquery'

import '../styles/form.scss'

export default class resetpwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'register',
            btnText: '注册',
            pwd: '',
            input2: ''
        }
    }
    componentDidMount() {
        var { query } = this.props.location
        this.state.type = query.t
        var title = ''
        var bt = ''
        switch (this.state.type) {
            case 'register':
                title = '注册'
                bt = '确定注册'
                break
            case 'changepwd':
                title = '修改密码'
                bt = '确定修改'
                break
            case 'findpwd':
                title = '找回密码'
                bt = '确定修改'
                break
        }
        this.setState({
            btnText: bt
        })
        PubSub.publish('updateTitle',title)

    }
    handleClick = (e) => {
        var { query } = this.props.location
        var _this = this
        if (this.state.type === 'register') {
            $.ajax({
                type: "POST",
                url: "/api/regist",
                data: JSON.stringify({
                    m: query.p,
                    c: query.c,
                    n: _this.state.input2,
                    p: _this.state.pwd,
                    t: _this.state.type
                }) ,
                dataType: "json",
                success: function(data){
                    if (data.code === 200) {
                        window.location.href= '/#/records'
                    } else {
                        notification['error']({
                            message: '错误提示',
                            description: data.message,
                        })
                    }
                },
                error: function() {
                    notification['error']({
                        message: '错误提示',
                        description: '网络异常!',
                    })
                }
            })
        }
    }
    pwdChange = (e) => {
        this.setState({
            pwd: e.target.value
        })
    }
    input2Change = (e) => {
        this.setState({
            input2: e.target.value
        })
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box" key="a">
                    <div className="pkl-form-group">
                        <div className="pkl-input-group pkl-input-group-line">
                            <Icon type="lock" className="login_icon"/>
                            <input placeholder="*密码: (6-20位数，由数字和字母构成)" onChange={this.pwdChange} value={this.state.pwd} type="password" />
                        </div>
                        <div className="pkl-input-group">
                            <Icon type="user" className="login_icon"/>
                            <input placeholder="*昵称: (2-6字符，由数字、字母和汉字构成)" onChange={this.input2Change} value={this.state.input2} type="text" />
                        </div>
                    </div>
                    <button className="pkl-cus-btn-red" onClick={this.handleClick}>{this.state.btnText}</button>
                </div>
            </QueueAnim>
        )
    }
}
