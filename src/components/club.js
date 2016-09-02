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

        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','back')
        PubSub.publish('updateTitle','俱乐部档案')
        $('.tab-item').on('click',function(){
            console.log($(this).index)
        })
    }
    handleClick = (e) => {

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
                            <div className="tab-item active">战绩</div>
                            <div className="tab-item">猎物/克星</div>
                        </div>
                        <div className="tab-content"></div>
                        <div className="tab-content"></div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
