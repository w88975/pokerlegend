/**
* @Author: kamisama
* @Date:   2016-08-31T16:41:57+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T18:16:29+08:00
*/



import React from 'react'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'
import { Input, Icon, notification, Modal} from 'antd'

import '../styles/replay.scss'

export default class replay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recordName: '第XX手',
            visible: false
        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','back')
        PubSub.publish('updateTitle','牌谱回顾')
    }
    editClick = (e) => {
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
    rnameChange = (e) => {
        this.setState({
            recordName: e.target.value
        })
    }
    starClick = (e) => {

    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box pkl-replay" key="a">
                    <div className="pkl-replay-content"></div>
                    <div className="pkl-replay-info">
                        <div className="line">
                            <div>{this.state.recordName}<span onClick={this.editClick}>编辑</span></div>
                            <div><Icon type="star" onClick={this.starClick} className="icon_touch" /></div>
                        </div>
                        <div className="line">
                            <div><Icon type="eye" />13/50</div>
                            <div><Icon type="clock-circle" />2016-09-07 15:31:16</div>
                        </div>
                    </div>

                    <Modal title="编辑名称" visible={this.state.visible}
                      onOk={this.handleOk} onCancel={this.handleCancel}
                    >
                        <div className="pkl-input-group pkl-input-group-line">
                            <input placeholder="限5字以内" onChange={this.rnameChange} value={this.state.recordName} type="text" />
                        </div>
                    </Modal>
                </div>
            </QueueAnim>
        )
    }
}
