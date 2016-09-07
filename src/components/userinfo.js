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

import '../styles/userinfo.scss'

export default class userinfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [
                {
                    'name': 'KamiSama',
                    'winning': '63.0%',
                    'winning1v1': '78.3%',
                    'gains': '2534.2'
                },
                {
                    'name': 'KamiSama',
                    'winning': '63.0%',
                    'winning1v1': '78.3%',
                    'gains': '2534.2'
                }
            ]
        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','back')
        PubSub.publish('updateTitle','牌手档案')
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
                        <div className="club-name">用户名: KamiSama</div>
                        <div className="club-join-time">ID: 1457434343</div>
                    </div>

                    <div className="pkl-club-line">
                        <div className="left flex-1">
                            <span>入池率</span>
                            <span>9999/3498794</span>
                        </div>
                        <div className="right flex-3">
                            <div className="progress"><div className="bar"></div><span className="text">51%</span></div>
                        </div>
                    </div>

                    <div className="pkl-club-line">
                        <div className="left flex-1">
                            <span>胜率</span>
                            <span>9999/3498794</span>
                        </div>
                        <div className="right flex-3">
                            <div className="progress"><div className="bar" style={{width: (3342/7765)*100 + '%'}}></div><span className="text">51%</span></div>
                        </div>
                    </div>
                    <div className="pkl-usif-line"></div>
                    <div className="pkl-club-line">
                        <div className="left flex-1">
                            <span>与我1V1胜率</span>
                            <span>9999/3498794</span>
                        </div>
                        <div className="right flex-3">
                            <div className="progress"><div className="bar" style={{width: (3342/7765)*100 + '%'}}></div><span className="text">51%</span></div>
                        </div>
                    </div>
                    <div className="pkl-usif-line"></div>
                    <div className="pkl-records-table flex flex-1">
                        <table>
                            <thead>
                                <th>
                                    <td>ID</td>
                                    <td>俱乐部</td>
                                    <td>盈亏</td>
                                </th>
                            </thead>
                            <tbody>
                                {
                                    this.state.records.map(function(item){
                                        return <th>
                                            <td>{item.name}</td>
                                            <td>{item.winning}</td>
                                            <td>{item.gains}</td>
                                        </th>
                                    })
                                }
                            </tbody>
                            <div className="text-center" onClick={this.loadMore}>点击加载更多</div>
                        </table>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
