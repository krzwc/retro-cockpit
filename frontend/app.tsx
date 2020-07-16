import React from 'react';
import { Provider } from "react-redux";

import store from './src/resources/store';

import RouterTest from "components/router-test/router-test";

const App = () => {
    return (
        <Provider store={store}>
            <RouterTest />
        </Provider>
    );
};

export default App;
