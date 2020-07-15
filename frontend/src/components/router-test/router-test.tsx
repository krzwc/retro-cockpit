import React from "react";
import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin } from "@uirouter/react";
import { ConnectedUIRouter } from '@uirouter/redux/lib/react';
import { router } from '../../resources/router/router';
import { Home } from './home';

/*
const Hello = () => <h3>hello world</h3>;
const About = () => <h3>Its the UI-Router hello world app!</h3>;
*/

/*const Menu = () => {
    const activeClass = "active";
    const helloSref = useSrefActive("hello", null, activeClass);
    const aboutSref = useSrefActive("about", null, activeClass);

    return (
        <div>
            <a {...helloSref}>Hello</a>
            <a {...aboutSref}>About</a>
            <UIView/>
        </div>
    );
};*/
const states = [
    {
        name: 'home',
        url: '/home',
        component: Home,
    },
];

/*const helloState = {name: "hello", url: "/hello", component: Hello};
const aboutState = {name: "about", url: "/about", component: About};*/

/*const RouterTest = () => (
    <UIRouter plugins={[pushStateLocationPlugin]} states={[helloState, aboutState]}>
        {/!*<Menu/>*!/}
    </UIRouter>
);*/

const RouterTest = () => (
    <ConnectedUIRouter
        router={router}
        plugins={[pushStateLocationPlugin]}
        states={states}
    >
        <UIView />
    </ConnectedUIRouter>
)

export default RouterTest;
