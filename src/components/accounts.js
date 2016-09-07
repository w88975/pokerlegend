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
import { Input, Icon, notification } from 'antd'

import '../styles/accounts.scss'

export default class accounts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','back')
        PubSub.publish('updateTitle','每日TOP牌谱')
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box pkl-daytop" key="a">
                    <div className="pkl-club-tab">
                        <div className="tab-head">
                            <div className={this.state.tabIndex === 0 ? 'tab-item active' : 'tab-item'} onClick={this.tabClick}>赢的最多</div>
                            <div className={this.state.tabIndex === 0 ? 'tab-item' : 'tab-item active'} onClick={this.tabClick}>输的最多</div>
                        </div>
                        <div className={this.state.tabIndex === 0 ? 'tab-content' : 'tab-content hidden'}>
                            1
                        </div>
                        <div className={this.state.tabIndex === 0 ? 'tab-content hidden' : 'tab-content'}>
                            2
                        </div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
