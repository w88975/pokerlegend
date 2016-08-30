/**
* @Author: kamisama
* @Date:   2016-08-30T10:46:43+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-30T19:02:35+08:00
*/


import React from 'react'
import {Icon} from 'antd'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'

import '../styles/records.scss'

export default class records extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headImg: '',
            userName: '',
            platform: ''
        }
    }
    componentDidMount() {
        PubSub.publish('updateTitle','我的战绩')
        PubSub.publish('updateMenu','profile')
        // 填充测试数据
        this.setState({
            headImg: 'http://7u2k79.com1.z0.glb.clouddn.com/o_19mihjt9k11nf10v1171qpt21vkm9.jpg',
            userName: 'KamiSama',
            platform: '德扑圈'
        })
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box flex-col" key="a">
                    <div className="pkl-records-head">
                        <div className="pkl-records-headimg">
                            <img src={this.state.headImg}/>
                            <span className="username">{this.state.userName}</span>
                            <div className="platform">{this.state.platform}</div>
                        </div>
                        <div className="pkl-records-statistics">
                            <li>
                                <div className="key">盈利</div>
                                <div className="value">8000</div>
                            </li>
                            <li>
                                <div className="key">手数</div>
                                <div className="value">2382手</div>
                            </li>
                            <li>
                                <div className="key">入池率</div>
                                <div className="value">30%</div>
                            </li>
                            <li>
                                <div className="progress">
                                    <div className="bar"></div>
                                    <span className="text">胜率 51%</span>
                                </div>
                            </li>
                        </div>
                        <span className="pkl-records-godetail">查看详情 ></span>
                    </div>
                    <div className="pkl-records-history">
                        <div className="circle">每日top牌谱</div>
                        <div className="circle">今日牌谱</div>
                        <div className="circle">历史牌谱</div>
                    </div>
                    <div className="pkl-records-line">
                        <div>对阵战绩</div>
                        <div>筛选</div>
                    </div>
                    <div className="pkl-records-table flex flex-1">
                        <table>
                            <thead>
                                <th>
                                    <td>昵称</td>
                                    <td>胜率</td>
                                    <td>1V1胜率</td>
                                    <td>盈亏</td>
                                </th>
                            </thead>
                            <tbody>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>我是一个超长的名字的用户</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>TT</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                                <th>
                                    <td>KamiSama</td>
                                    <td>100%</td>
                                    <td>100%</td>
                                    <td>88975</td>
                                </th>
                            </tbody>
                        </table>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
