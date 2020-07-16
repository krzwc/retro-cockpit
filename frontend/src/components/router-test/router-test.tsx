import React from "react";
import { UISref, UIView, pushStateLocationPlugin } from "@uirouter/react";
import { ConnectedUIRouter } from '@uirouter/redux/lib/react';
import { router } from '../../resources/router/router';
import { Home } from './home';
import Test from "components/test/test";

const helloState = {name: "hello", url: "/hello", component: Home};
const aboutState = {name: "test", url: "/test", component: Test};

const states = [helloState, aboutState];

const RouterTest = () => (
    <ConnectedUIRouter
        router={router}
        plugins={[pushStateLocationPlugin]}
        states={states}
    >
        <div className="main">
            <nav className="menu">
                <ul>
                    <UISref to="hello">
                        <a>
                            <li>hello</li>
                        </a>
                    </UISref>
                    <UISref to="test">
                        <a>
                            <li>test</li>
                        </a>
                    </UISref>
                </ul>
            </nav>
            <div className="content">
                <UIView />
            </div>
        </div>
    </ConnectedUIRouter>
);

export default RouterTest;
