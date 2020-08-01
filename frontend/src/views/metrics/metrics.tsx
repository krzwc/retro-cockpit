import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';
import SimpleChart from 'components/chart';

const Metrics: FunctionComponent = () => {
    return (
        <div>
            <progress className={classNames('nes-progress', 'is-error')} value="30" max="100"></progress>
            <div className="p-3 m-4 border border-muted">
                <SimpleChart />
            </div>
        </div>
    );
};

export default Metrics;
