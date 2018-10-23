import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import request from '../Common/Utils/request';

const Item = List.Item;
const Meta = Item.Meta;

class Tools extends Component {

    state = {
        jobs: []
    };

    componentWillMount() {
        let option = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        request("/api/jobs/1/30", option).then((response) => {
            return response.json();//json访法仍是promise
        }).then((data) => {
            console.log(data);
            this.setState({ jobs: data });
        }).catch(ex => {
            console.error('获取数据出错, ', ex.message);
        });
    }

    callback = (key) => {
        console.log(key);
    };

    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.jobs}
                renderItem={item => (
                    <List.Item>
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href={item.link}>{item.name}</a>}
                            description={item.company + "    " + item.area + "    " + item.publishdate}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

export default Tools;
