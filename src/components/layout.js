/**
* @Author: KamiSama
* @Date:   2016-08-26T14:52:49+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T17:50:44+08:00
*/



import React from 'react'
import {Icon} from 'antd'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'

import '../styles/layout.scss'

export default class myLayout extends React.Component {
    constructor(props) {
        super(props)
        PubSub.subscribe('hideLayout', this.showHide) // 注册隐藏header
        PubSub.subscribe('updateTitle', this.updateTitle) // 注册更新title
        PubSub.subscribe('updateMenu', this.updateMenu) // 注册更新title
        this.state = {
            title: '德扑神器',
            showMenu: false,// 个人中心的隐藏或者显示样式
            type: 'back' // back(只有回退按钮) back-filter(回退加筛选) profile(个人中心) profile-platform(个人中心加平台筛选)
        }
    }
    componentDidMount() {

    }
    updateMenu = (f,r) => {
        this.setState({
            type: r
        })
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
    leftMenu = () => {
        if (this.state.type === 'back' || this.state.type === 'back-filter') {
            window.history.back(-1)
        } else {
            this.setState({
                showMenu: true
            })
        }
    }

    rightMenu = () => {
        if (this.state.type === 'back-filter') {
            PubSub.publish('emitFileter') // filter
        }
    }

    profileClick = () => {
        this.setState({
            showMenu: false
        })
    }

    menuBarClick = (e) => {
        e.stopPropagation()
    }

    render() {
        return (
            <div className="my_layout">
                <div className="my_header" style={this.style}>
                    <div className="my_layout_back">
                        <Icon type={this.state.type === 'profile' || this.state.type === 'profile-platform' ? 'bars' : 'left'} className="my_icon" onClick={this.leftMenu}/>
                    </div>
                    <div className="my_layout_title">{this.state.title}</div>
                    <div className={this.state.type === "back" || this.state.type === 'profile' ? 'no_menu' : 'my_layout_right'} onClick={this.rightMenu}>
                        {this.state.type === 'back-filter' ? '筛选' : ''}
                        {this.state.type === 'profile-platform' ? '德扑圈' : ''}
                    </div>
                </div>
                <div className="my_content">
                    { this.props.children }
                </div>
                <div className="pkl-profile-panel" style={this.state.showMenu ? {left: '0rem'} : {left: '-100%'}} onClick={this.profileClick}>
                    <div className="menu-bar" onClick={this.menuBarClick}>
                          { this.state.showMenu ? [
                            <QueueAnim className="demo-content"
                              key="menu"
                              type={['right', 'left']}
                              delay={500}
                              ease={['easeOutQuart', 'easeInOutQuart']}>
                                <Link to="/records" key="a"><Icon type="cloud-download-o" /> 同步数据</Link><br/>
                                <Link to="/resetpwd" key="b"><Icon type="line-chart" /> 盈亏统计</Link><br/>
                                <Link to="/favorite" key="c"><Icon type="star" /> 收藏牌局</Link><br/>
                                <Link to="/verifyCode" key="d"><Icon type="user" /> 账号管理</Link><br/>
                                <Link to="/records" key="e"><Icon type="setting" /> 设置</Link><br/>
                                <Link to="/login" key="f"><Icon type="cross-circle-o" /> 退出登录</Link><br/>
                            </QueueAnim>
                            ]: null}
                    </div>
                </div>
            </div>
        )
    }
}
