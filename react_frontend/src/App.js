import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Menu, Icon } from 'antd';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import storage from './Common/Utils/storage';
import { Home, Test } from './LoadableComponent';
import './App.css';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class App extends Component {
  constructor(...props) {
    super(...props);
  }

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout = () => {
    storage.local.remove("username");
    this.props.history.push("/login");
  }

  render() {
    if(!this.props.isLogin()){
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="container">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="App-logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span><NavLink to="/home">Home</NavLink></span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="App-trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Icon className="App-logout" type="logout" onClick={this.logout} />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path="/home" component={Test} />
              <Route path="/" component={Home} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
