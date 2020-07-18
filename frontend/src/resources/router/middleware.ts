import { Middleware } from 'redux';
import { createRouterMiddleware } from '@uirouter/redux';
import { getUiRouter } from './router';

/**
 * Modified version of uirouter/redux middleware to support uiRouter cleanup usecase.
 */
const routerMiddleware: Middleware = () => {
  let router = getUiRouter();
  // @ts-ignore TS doesn't see super class of UIRouterReact
  let handler = createRouterMiddleware(router)();

  return (next) => (action) => {
    const uiRouter = getUiRouter();
    if (router !== uiRouter) {
      router = uiRouter;
      // @ts-ignore TS doesn't see super class of UIRouterReact
      handler = createRouterMiddleware(router)();
    }

    return handler(next)(action);
  };
};

export default routerMiddleware;