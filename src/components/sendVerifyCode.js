/**
* @Author: KamiSama
* @Date:   2016-08-26T12:01:29+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T17:28:09+08:00
*/

import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'
import { Input, Icon, notification } from 'antd'
import $ from 'jquery/dist/jquery'

import '../styles/form.scss'

export default class sendVerifyCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'register', // register changepwd findpwd
            phoneNumber: '',
            VerifyCode: '',
            VerifyCodeMsg: '获取验证码',
            disabled: ''
        }
        this.style = {
            marginTop: '50px'
        }
    }
    componentDidMount() {
        var { query } = this.props.location
        this.state.type = query.type
        var title = ''
        switch (this.state.type) {
            case 'register':
                title = '注册'
                break
            case 'changepwd':
                title = '修改密码'
                break
            case 'findpwd':
                title = '找回密码'
                break
        }
        PubSub.publish('updateTitle',title)
    }
    sendVerifyCode = (e) => {
        var s = this.state
        var _this = this
        if (this.state.phoneNumber.length !== 11) {
            return notification['error']({
                message: '错误提示',
                description: '请输入正确的手机号!',
            })
        }
        switch (this.state.type) {
            case 'register':
                $.ajax({
                    type: "POST",
                    url: "/api/sendverify",
                    data: JSON.stringify({
                        m: s.phoneNumber,
                        t: s.type
                    }) ,
                    dataType: "json",
                    success: function(data){
                        if (data.code === -2) {
                            return notification['error']({
                                message: '错误提示',
                                description: data.message,
                            })
                        } else if (data.code === 200) {
                            var timer = 60
                            var t = setInterval(()=>{
                                timer--
                                var dis = 'disabled'
                                var msg = timer + '秒后重试'
                                if (timer <= 0) {
                                    timer = 60
                                    msg = '获取验证码'
                                    dis = ''
                                    clearInterval(t)
                                }
                                _this.setState({
                                    VerifyCodeMsg: msg,
                                    disabled: dis
                                })
                            },1000)
                        }
                    }
                })
            break
        }

    }
    phoneNumberChange = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    VerifyCodeChange = (e) => {
        this.setState({
            VerifyCode: e.target.value
        })
    }
    nextEvent = (e) => {
        var _this = this
        var phoneNumber,verifyCode
        if (this.state.phoneNumber.length === 11 && this.state.VerifyCode.length > 0) {
            phoneNumber = this.state.phoneNumber,verifyCode = this.state.VerifyCode
            $.ajax({
                type: "POST",
                url: "/api/checkverify",
                data: JSON.stringify({
                    m: phoneNumber,
                    c: verifyCode,
                    t: this.state.type
                }) ,
                dataType: "json",
                success: function(data){
                    if(data.code === 200) {
                        return window.location.href=`/#/resetpwd?p=${phoneNumber}&c=${verifyCode}&t=${_this.state.type}`
                    }
                    notification['error']({
                        message: '错误提示',
                        description: data.message,
                    })
                },
                error: function() {
                    notification['error']({
                        message: '错误提示',
                        description: '网络异常!',
                    })
                }
            })

        } else {
            notification['error']({
                message: '错误提示',
                description: '请输入完整的手机号和短信验证码!',
            })
        }
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box" key="a" style={this.style}>
                    <div className="ant-col-24">
                        <div className="pkl-form-group">
                            <div className="pkl-input-group pkl-input-group-line">
                                <Icon type="mobile" className="login_icon"/>
                                <input placeholder="手机号码" type="number" onChange={this.phoneNumberChange} value={this.state.phoneNumber}/>
                            </div>

                            <div className="pkl-input-group">
                                <input placeholder="验证码" onChange={this.VerifyCodeChange} value={this.state.VerifyCode} type="text" />
                                <button className="pkl-btn pkl-btn-verify" disabled={this.state.disabled} onClick={this.sendVerifyCode}>{this.state.VerifyCodeMsg}</button>
                            </div>
                        </div>
                        <button className="pkl-cus-btn-red" onClick={this.nextEvent}>下一步</button>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
