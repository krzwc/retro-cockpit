import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';
import MovingChart from 'components/chart';

const Metrics: FunctionComponent = () => {
    return (
        <div>
            <progress className={classNames('nes-progress', 'is-error')} value="30" max="100"></progress>
            <div className="p-3 m-4 border border-muted">
                <MovingChart nb_bar={10} />
            </div>
        </div>
    );
};

export default Metrics;
