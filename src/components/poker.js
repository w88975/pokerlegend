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

import '../styles/poker.scss'

export default class Poker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'A',
            type: '♥', //♥ ♠ ♦ ♣
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="poker" style={this.props.type === '♥' || this.props.type === '♦' ? {color: 'red'}: {color: 'black'}}>
                <span className="top">{this.props.value}</span>
                <span className="top_icon">{this.props.type}</span>
                <span className="center_icon">{this.props.type}</span>
                <span className="bottom">{this.props.value}</span>
                <span className="bottom_icon">{this.props.type}</span>
            </div>
        )
    }
}

export {Poker}
