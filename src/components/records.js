/**
* @Author: kamisama
* @Date:   2016-08-30T10:46:43+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T17:46:46+08:00
*/


import React from 'react'
import {Icon} from 'antd'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import PubSub from 'pubsub-js/src/pubsub'

import '../styles/records.scss'

export default class records extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headImg: '',
            userName: '',
            platform: '',
            showFilter: false,
            filterStyle: {
                transform: 'scale(0)'
            },
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
                },
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
                },
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
                },
            ]
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
    componentWillUnmount(){
        PubSub.publish('updateMenu','back')
    }
    filterClick = () => {
        this.setState({
            showFilter: !this.state.showFilter,
            filterStyle: {
                transform: !this.state.showFilter ? 'scale(1)' : 'scale(0)'
            }
        });
    }
    loadMore = () => {
        // ajax获取更多数据
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
                        <Link to="/today"><div className="circle">今日牌谱</div></Link>
                        <div className="circle">历史牌谱</div>
                    </div>
                    <div className="pkl-records-line">
                        <div>对阵战绩</div>
                        <div onClick={this.filterClick}>筛选 <Icon type="down" /></div>
                        <div className="records-filter" style={this.state.filterStyle}>
                            <span>胜率</span>
                            <span>1V1胜率</span>
                            <span>盈利</span>
                        </div>
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
                                {
                                    this.state.records.map(function(item){
                                        return <th>
                                            <td>{item.name}</td>
                                            <td>{item.winning}</td>
                                            <td>{item.winning1v1}</td>
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
