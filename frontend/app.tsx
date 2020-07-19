import React from 'react';
import { Provider } from 'react-redux';
import { /* UISref, */ UIView } from '@uirouter/react';

import store from 'resources/store';

// import RouterTest from "components/router-test/router-test";
import Router from 'resources/router/router';
import Nav from 'components/nav';

const App = () => {
    return (
        <Provider store={store}>
            {/* <RouterTest /> */}
            <Router>
                <div className="main">
                    {/* <nav className="menu">
                        <ul>
                            <UISref to="home">
                                <a>
                                    <li>home</li>
                                </a>
                            </UISref>
                            <UISref to="test">
                                <a>
                                    <li>test</li>
                                </a>
                            </UISref>
                        </ul>
                    </nav> */}
                    <Nav />
                    <div className="content">
                        <UIView name="main" />
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
