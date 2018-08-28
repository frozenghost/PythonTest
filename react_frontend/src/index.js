import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import WrappedNormalLoginForm from './LoginModule/LoginForm';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker';
import storage from './Common/Utils/storage';
import { App } from './LoadableComponent';
import './index.css';


class Root extends Component {
    constructor(...props) {
        super(...props);
        this.isLogin = () => storage.local.get("username") !== null;
    }

    authorize = (Component, props) => {
        if (this.isLogin()) {
            var temp = { isLogin: this.isLogin.bind(this), ...props }; // 传递父组件的方法，判断是否登录
            return (
                <Component {...temp} />
            );
        }
        return (
            <Redirect to="/login" />
        );
    }

    render() {
        return (
            <BrowserRouter>
                <LocaleProvider locale={zh_CN}>
                    <Switch>
                        <Route exact path="/login" component={WrappedNormalLoginForm} />
                        <Route path="/" component={props => this.authorize(App, props)} />
                        <Redirect to="/" /> :
                        </Switch>
                </LocaleProvider>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
