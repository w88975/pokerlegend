/**
* @Author: KamiSama
* @Date:   2016-08-26T14:52:49+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   KamiSama
* @Last modified time: 2016-08-29T18:08:04+08:00
*/



import React from 'react'
import {Icon} from 'antd'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'

import '../styles/layout.scss'

export default class myLayout extends React.Component {
    constructor(props) {
        super(props)
        PubSub.subscribe('hideLayout', this.showHide) // 注册隐藏header
        PubSub.subscribe('updateTitle', this.updateTitle) // 注册更新title
        this.state = {
            title: '德扑神器'
        }
    }
    componentDidMount() {

    }
    showHide = (r,t) =>{
        this.style = {
            display: t ? 'block' : 'none'
        }
    }
    updateTitle = (f,r) => {
        this.setState({
            title: r
        })
    }
    back = () => {
        window.history.back(-1)
    }
    render() {
        return (
            <div className="my_layout">
                <div className="my_header" style={this.style}>
                    <div className="my_layout_back">
                        <Icon type="left" className="my_icon" onClick={this.back}/>
                    </div>
                    <div className="my_layout_title">{this.state.title}</div>
                </div>
                <div className="my_content">
                    { this.props.children }
                </div>
            </div>
        )
    }
}
