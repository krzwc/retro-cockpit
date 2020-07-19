import React, { FunctionComponent } from 'react';

interface IconProps {
    type: string;
    className?: string;
    onClick?(): void;
}

const Icon: FunctionComponent<IconProps> = ({ className, type, ...props }) => <i {...props} />;

export default Icon;
