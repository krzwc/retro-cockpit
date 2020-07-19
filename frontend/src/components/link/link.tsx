import React, { FunctionComponent } from 'react';
import { TransitionOptions, UISref } from '@uirouter/react';

interface LinkProps {
    clearFilterQuery?: boolean;
    to: string;
    params?: {
        [key: string]: any;
    };
    options?: TransitionOptions;
    className?: string;
    testLocator?: string;
}

const Link: FunctionComponent<LinkProps> = ({ clearFilterQuery = false, params, ...rest }) => {
    return <UISref params={clearFilterQuery ? { ...params, filters: null } : params} {...rest} />;
};

export default Link;
