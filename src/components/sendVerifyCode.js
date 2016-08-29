/**
* @Author: KamiSama
* @Date:   2016-08-26T12:01:29+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   KamiSama
* @Last modified time: 2016-08-29T18:07:51+08:00
*/

import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'
import { Input, Icon, notification } from 'antd'

import '../styles/form.scss'

export default class register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        PubSub.publish('updateTitle','注册页')
    }
    sendVerifyCode = (e) => {
        if (this.state.phoneNumber.length !== 11) {
            return notification['error']({
                message: '错误提示',
                description: '请输入正确的手机号!',
            });
        }
        var timer = 60
        var _this = this
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
            this.setState({
                VerifyCodeMsg: msg,
                disabled: dis
            })
        },1000);
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
        if (this.state.phoneNumber.length === 11 && this.state.VerifyCode.length > 0) {
            window.location.href="/#/my_test?kk=vv"
        } else {
            notification['error']({
                message: '错误提示',
                description: '请输入完整的手机号和短信验证码!',
            });
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
