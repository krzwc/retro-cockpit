// import { UIRouterReact } from '@uirouter/react';
// import { createRouterMiddleware, routerReducer, triggerTransition } from '@uirouter/redux';
// import { ConnectedUIRouter } from '@uirouter/redux/lib/react';

// const router = new UIRouterReact();

// const routerMiddleware = createRouterMiddleware(router);

// export { router, routerMiddleware, routerReducer, triggerTransition };

import React, { PureComponent, ReactElement } from 'react';
import { UIRouterReact, pushStateLocationPlugin } from '@uirouter/react';
import { ConnectedUIRouter } from '@uirouter/redux/lib/react';

import { possibleRoutes } from '../../views/routes';
import { RouteInstance } from './interfaces';

// Create a new instance of the Router
let uiRouter = new UIRouterReact();

/**
 * Returns instance of uiRouter
 */
export function getUiRouter() {
    return uiRouter;
}

interface RouterProps {
    children?: ReactElement;
}

class Router extends PureComponent<RouterProps> {
    private readonly routes: RouteInstance[];

    constructor(props: RouterProps) {
        super(props);

        this.routes = possibleRoutes;
    }

    public componentWillUnmount() {
        uiRouter.dispose(); // Primarily disposes internal state and event listeners
        uiRouter = new UIRouterReact(); // Recreate router to ensure clean state
    }

    public render() {
        const { children } = this.props;

        return (
            <ConnectedUIRouter
                router={uiRouter}
                config={this.configureRouter}
                states={this.routes}
                plugins={[pushStateLocationPlugin]}
            >
                {React.Children.only(children)}
            </ConnectedUIRouter>
        );
    }

    private configureRouter = (routerInstance: UIRouterReact) => {
        // Global config for router
        routerInstance.urlService.rules.initial({ state: 'home' });
        routerInstance.urlService.rules.otherwise({ state: 'home' });
    };
}

export default Router;
