import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import WrappedNormalLoginForm from './LoginModule/LoginForm';
import './index.css';
import App from './App';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker';

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <LocaleProvider locale={zh_CN}>
                        <Switch>
                            <Route exact path="/" component={WrappedNormalLoginForm} />
                            <Route path="/home" component={App} />
                            <Redirect to="/" />
                        </Switch>
                    </LocaleProvider>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
