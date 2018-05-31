/// <reference types="react" />
import * as React from 'react';
export interface DeepMatchProps {
    text: string | React.ReactNode;
    find: string | RegExp;
    wrap?: (match: string, index: string) => string | React.ReactNode;
}
declare const DeepMatch: React.SFC<DeepMatchProps>;
export default DeepMatch;
