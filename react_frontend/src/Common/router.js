import React, { Component } from 'react';
import { Home, Test, Tools, Jobs } from '../LoadableComponent';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

var data = [{ path: '/home', relatedcomponent: Test },
{ path: '/tools', relatedcomponent: Tools },
{ path: '/jobs', relatedcomponent: Jobs },
{ path: '/', relatedcomponent: Home }
];

class Routers extends Component {
    render() {
        return (
            <Switch>
                {
                    data.map((item) => {
                        return (
                            <Route path={item.path} component={item.relatedcomponent} />);
                    })
                }
            </Switch>);
    }
}

export default Routers;