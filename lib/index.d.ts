/// <reference types="react" />
import * as React from 'react';
export interface DeepMatchProps {
    text: string | React.ReactNode;
    find: string | RegExp;
    wrap?: Function;
}
declare const DeepMatch: React.SFC<DeepMatchProps>;
export default DeepMatch;
