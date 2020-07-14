import React from 'react';
import { Provider } from "react-redux";

import store from './src/resources/store';

import Test from './src/components/test/test';

const App = () => {
    return (
        <Provider store={store}>
            <Test />
        </Provider>
    );
};

export default App;
