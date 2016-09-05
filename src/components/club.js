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

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import '../styles/club.scss'

export default class today extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0,
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
        PubSub.publish('updateTitle','俱乐部档案')
        var _this = this;
        setTimeout(function(){
            _this.rendderCharts();
        },100);
    }
    tabClick = (e) => {
        if(e.target.innerHTML === '战绩') {
            this.setState({
                tabIndex: 0
            })
        } else {
            this.setState({
                tabIndex: 1
            })
        }
    }
    rendderCharts = () => {
        var incomeChart = echarts.init(document.getElementById('income'))
        var timeChart = echarts.init(document.getElementById('time'))
        var option = {
            backgroundColor: '#fff',
            title: {
                text: '总盈利: 32554',
                left: 'center',
                top: 0,
                textStyle: {
                    color: 'rgba(0, 0, 0, 0.5)',
                    fontSize: '1.4rem'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '俱乐部盈利',
                    type: 'pie',
                    radius: '70%',
                    data:[
                        {value:235, name:'KamiSama',itemStyle: {
                            normal: {
                                color: '#fff'
                            }
                        }},
                        {value:274, name:'GhostEye',itemStyle: {
                            normal: {
                                color: '#424040'
                            }
                        }},
                    ],
                    roseType: 'angle',
                    itemStyle: {
                        normal: {
                            color: '#d4d4d4',
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.3)'
                            },
                            smooth: 0.2,
                            length: 8,
                            length2: 10
                        }
                    },
                }
            ]
        };
        incomeChart.setOption(option);
        timeChart.setOption(option);
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

                            <div className="pkl-club-line">
                                <div className="left flex-1">
                                    <span>胜率</span>
                                    <span>9999/3498794</span>
                                </div>
                                <div className="right flex-3">
                                    <div className="progress"><div className="bar" style={{width: (3342/7765)*100 + '%'}}></div><span className="text">51%</span></div>
                                </div>
                            </div>
                            <div className="pkl-club-line">
                                <div className="left flex-1">
                                    单手最高盈利
                                </div>
                                <div className="right flex-3">
                                    21557
                                </div>
                            </div>
                            <div className="pkl-chart-content">
                                <div className="charts" id="income"></div>
                                <div className="charts" id="time"></div>
                            </div>
                        </div>
                        <div className={this.state.tabIndex === 0 ? 'tab-content hidden' : 'tab-content'}>
                            <div className="pkl-club-title-line">我的猎物</div>
                            <div className="pkl-records-table flex flex-1">
                                <table>
                                    <thead>
                                        <th>
                                            <td>昵称</td>
                                            <td>胜率</td>
                                        </th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.records.map(function(item){
                                                return <th>
                                                    <td>{item.name}</td>
                                                    <td>{item.winning}</td>
                                                </th>
                                            })
                                        }
                                    </tbody>
                                    <div className="text-center" onClick={this.loadMore}>点击加载更多</div>
                                </table>
                            </div>

                            <div className="pkl-club-title-line">我的克星</div>
                            <div className="pkl-records-table flex flex-1">
                                <table>
                                    <thead>
                                        <th>
                                            <td>昵称</td>
                                            <td>胜率</td>
                                        </th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.records.map(function(item){
                                                return <th>
                                                    <td>{item.name}</td>
                                                    <td>{item.winning}</td>
                                                </th>
                                            })
                                        }
                                    </tbody>
                                    <div className="text-center" onClick={this.loadMore}>点击加载更多</div>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
