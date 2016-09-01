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

import '../styles/form.scss'

export default class resetpwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'register',
            btnText: '注册'
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
                break;
            case 'changepwd':
                title = '修改密码'
                bt = '确定修改'
                break;
            case 'findpwd':
                title = '找回密码'
                bt = '确定修改'
                break;
        }
        this.setState({
            btnText: bt
        })
        PubSub.publish('updateTitle',title)

    }
    handleClick = (e) => {

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
                            <input placeholder="*密码: (6-20位数，由数字和字母构成)" type="password" />
                        </div>
                        <div className="pkl-input-group">
                            <Icon type="user" className="login_icon"/>
                            <input placeholder="*昵称: (2-6字符，由数字、字母和汉字构成)" type="text" />
                        </div>
                    </div>
                    <button className="pkl-cus-btn-red" onClick={this.handleClick}>{this.state.btnText}</button>
                </div>
            </QueueAnim>
        )
    }
}
