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

import '../styles/today.scss'

export default class today extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                newcount: 30
            },
            records: [
                // 测试数据
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
        PubSub.publish('updateMenu','back-filter')
        PubSub.publish('updateTitle','今日牌谱')

    }
    handleClick = (e) => {

    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box" key="a">
                    <div className="pkl-today-new">
                        新增手数: {this.state.data.newcount}
                    </div>
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
