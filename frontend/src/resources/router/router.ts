import { UIRouterReact } from '@uirouter/react';
import { createRouterMiddleware, routerReducer } from '@uirouter/redux';

const router = new UIRouterReact();

const routerMiddleware = createRouterMiddleware(router);

export { router, routerMiddleware, routerReducer };
