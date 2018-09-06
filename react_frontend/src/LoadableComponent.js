import React, { Component } from 'react';
import Loadable from 'react-loadable';

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

const Home = Loadable({
    loader: () => import('./Home'),
    loading: loadingComponent
});

const Tools = Loadable({
    loader: () => import('./ToolsModule/Tools'),
    loading: loadingComponent
});

const Test = Loadable({
    loader: () => import('./LoginModule/LoginForm'),
    loading: loadingComponent
});

export { App, Home, Test, Tools };