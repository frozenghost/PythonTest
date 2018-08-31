import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Menu, Icon } from 'antd';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import storage from './Common/Utils/storage';
import { Home, Test } from './LoadableComponent';
import './App.css';
import request from './Common/Utils/request';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class App extends Component {
  constructor(...props) {
    super(...props);
  }

  state = {
    collapsed: false,
    modules: []
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
    request("/api/Modules", option).then((response) => {
      return response.json();//json访法仍是promise
    }).then((data) => {
      console.log(data);
      this.setState({ modules: data });
    }).catch(ex => {
      console.error('获取数据出错, ', ex.message);
    });
  }

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
    const modules = this.state.modules;
    if (!this.props.isLogin()) {
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
            {
              modules.map((item, index) => {
                return (
                  <Menu.Item key={index + 1}>
                    <NavLink to={item.moduleurl}><Icon type={item.moduleicontype} />{this.state.collapsed ? "" : item.modulename}</NavLink>
                  </Menu.Item>);
              })
            }
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
