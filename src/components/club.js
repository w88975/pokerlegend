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
import $ from 'jquery/dist/jquery'

import '../styles/club.scss'

export default class today extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','back')
        PubSub.publish('updateTitle','俱乐部档案')
        console.log(document.body)
    }
    tabClick = (e) => {
        this.setState({
            tabIndex: this.state.tabIndex === 0 ? 1 : 0
        })
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box" key="a">
                    <div className="pkl-club-head">
                        <div className="club-name">KamiSama的俱乐部</div>
                        <div className="club-join-time">加入时间 2016.09.02</div>
                    </div>
                    <div className="pkl-club-tab">
                        <div className="tab-head">
                            <div className={this.state.tabIndex === 0 ? 'tab-item active' : 'tab-item'} onClick={this.tabClick}>战绩</div>
                            <div className={this.state.tabIndex === 0 ? 'tab-item' : 'tab-item active'} onClick={this.tabClick}>猎物/克星</div>
                        </div>
                        <div className={this.state.tabIndex === 0 ? 'tab-content' : 'tab-content hidden'}>
                            <div className="pkl-club-line">
                                <div className="left flex-1">
                                    <span>入池率</span>
                                    <span>9999/3498794</span>
                                </div>
                                <div className="right flex-3">
                                    <div className="progress"><div className="bar"></div><span className="text">51%</span></div>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.tabIndex === 0 ? 'tab-content hidden' : 'tab-content'}>2</div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
