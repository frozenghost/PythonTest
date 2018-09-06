import React, { Component } from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class Tools extends Component {
    callback = (key) => {
        console.log(key);
    };

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="文字替换" key="1">Content of Tab Pane 1</TabPane>
            </Tabs>
        );
    }
}

export default Tools;
