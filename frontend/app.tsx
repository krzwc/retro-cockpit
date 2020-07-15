import React from 'react';
import { Provider } from "react-redux";

import store from './src/resources/store';

// import Test from './src/components/test/test';
import RouterTest from "components/router-test/router-test";

const App = () => {
    return (
        <Provider store={store}>
            <RouterTest />
            {/*<Test />*/}
        </Provider>
    );
};

export default App;
