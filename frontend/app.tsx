import React from 'react';
import { Provider } from 'react-redux';

import store from './src/resources/store';

// import RouterTest from "components/router-test/router-test";
import Router from './src/resources/router/router';

const App = () => {
    return (
        <Provider store={store}>
            {/* <RouterTest /> */}
            <Router />
        </Provider>
    );
};

export default App;
