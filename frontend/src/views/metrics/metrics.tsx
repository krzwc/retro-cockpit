import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

const Metrics: FunctionComponent = () => {
    return (
        <div>
            <progress className={classNames('nes-progress', 'is-primary')} value="80" max="100"></progress>
        </div>
    );
};

export default Metrics;
