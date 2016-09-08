/**
* @Author: kamisama
* @Date:   2016-08-31T16:41:57+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T18:16:29+08:00
*/



import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim/lib/QueueAnim'
import PubSub from 'pubsub-js/src/pubsub'
import { Input, Icon, notification,Modal,Button } from 'antd'
const confirm = Modal.confirm;

import '../styles/accounts.scss'

export default class accounts extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            nopadding: {
                padding: 0
            },
            nomargin: {
                margin: 0
            }
        },
        this.state = {
            visible: false,
            account: {
                headimg: 'http://7u2k79.com1.z0.glb.clouddn.com/o_19mihjt9k11nf10v1171qpt21vkm9.jpg',
                name: 'KamiSama',
                platform: '德扑圈',
                status: '验证通过'
            }
        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','profile')
        PubSub.publish('updateTitle','账号管理')
    }
    deleteAccountAction = () => {
        confirm({
            title: '您将删除账号',
            okText: '确认删除',
            onOk() {
              return
            },
            onCancel() {},
        })
    }
    addAccount = (e) => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        this.setState({
            visible: false
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box pkl-accounts" key="a">
                    <div className="pkl-club-title-line">我的账号</div>
                    { this.state.account ?  (
                    <div className="pkl-accounts-box">
                        <div className="line">
                            <div>
                                <img className="headimg" src={this.state.account.headimg}/>
                                <div className="name">{this.state.account.name}</div>
                            </div>
                            <span>{this.state.account.status}</span>
                        </div>
                        <div className="line">
                            <span>德扑圈</span>
                            <span className="pkl-btn" onClick={this.deleteAccountAction}>删除</span>
                        </div>
                    </div>
                    ): (
                    <div className="pkl-accounts-box accounts-box-center">
                        <span className="pkl-btn add" onClick={this.addAccount}>添加账号</span>
                    </div>
                    )
                    }

                    <Modal ref="modal"
                    visible={this.state.visible}
                    title="绑定账号" onOk={this.handleOk} onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取 消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>确定绑定</Button>,
                    ]}
                    >
                        <div className="pkl-form-group" style={this.style.nomargin}>
                            <div className="pkl-input-group pkl-input-group-line">
                                <Icon type="user" className="login_icon"/>
                                <input placeholder="账号" type="text" />
                            </div>
                            <div className="pkl-input-group pkl-input-group-line" style={this.style.nomargin}>
                                <Icon type="lock" className="login_icon"/>
                                <input placeholder="密码" type="password" />
                            </div>
                        </div>
                    </Modal>
                </div>
            </QueueAnim>
        )
    }
}
