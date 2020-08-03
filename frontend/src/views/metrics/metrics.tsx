import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';
import MovingChart from 'components/chart';

const Metrics: FunctionComponent = () => {
    return (
        <div>
            <progress className={classNames('nes-progress', 'is-error')} value="30" max="100"></progress>
            <MovingChart />
        </div>
    );
};

export default Metrics;
