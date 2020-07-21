import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';

import Layout from 'components/layout';
import store from 'resources/store';
import Router from 'resources/router/router';

import './src/styles/app.scss';

const App: FunctionComponent = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout />
            </Router>
        </Provider>
    );
};

export default App;
