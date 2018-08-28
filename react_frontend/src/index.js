import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import WrappedNormalLoginForm from './LoginModule/LoginForm';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker';
import storage from './Common/Utils/storage';
import Loadable from 'react-loadable';
import './index.css';


const loadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

const App = Loadable({
    loader: () => import('./App'),
    loading: loadingComponent
});

class Root extends Component {
    constructor(...props) {
        super(...props);
        this.isLogin = () => storage.local.get("username") !== null;
    }

    authorize = (Component, props) => {
        if (this.isLogin()) {
            return (
                <Component {...props} />
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
