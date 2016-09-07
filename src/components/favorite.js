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
import { Input, Icon, notification, Modal} from 'antd'

import '../styles/favorite.scss'

export default class today extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [
                {
                    id: '34341',
                    club: 'kamisama',
                    painis: '+74957'
                },
                {
                    id: '34341',
                    club: 'kamisama',
                    painis: '+74957'
                },
                {
                    id: '34341',
                    club: 'kamisama',
                    painis: '+74957'
                },
                {
                    id: '34341',
                    club: 'kamisama',
                    painis: '+74957'
                }
                ,{
                    id: '34341',
                    club: 'kamisama',
                    painis: '+74957'
                }
                ,{
                    id: '34341',
                    club: 'kamisama',
                    painis: '+74957'
                }
            ]
        }
    }
    componentDidMount() {
        PubSub.publish('updateMenu','back-filter')
        PubSub.publish('updateTitle','收藏牌局')
        PubSub.subscribe('emitFileter',this.activeFilter)
    }
    componentWillUnmount = () => {
        PubSub.unsubscribe('emitFileter')
    }
    activeFilter = (e,r) => {
        alert('filter');
    }
    render() {
        return (
            <QueueAnim
            type={['bottom', 'top']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
                <div className="ani-box pkl-favorite" key="a">
                    <div className="pkl-club-title-line">历史战绩</div>
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
                                            <td>{item.id}</td>
                                            <td>{item.club}</td>
                                            <td>{item.painis}</td>
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
