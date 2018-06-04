import * as React from 'react';
import { escapeRegExp } from './utils';
const cloneDeep: any = require('lodash.clonedeep');

export interface DeepMatchProps {
  text: string | React.ReactNode;
  find: string | RegExp;
  wrap?: (match: string, index: string) => string | React.ReactNode;
}

const deepReplace = (text: string | any, reg: RegExp, _wrap: Function, parentIndex?: number) => {
  if (typeof text === 'string') {
    const matched = text.match(reg);
    const result = text.split(reg).map((partial, index) => {
      const matchKey = parentIndex !== undefined ? `${parentIndex}-${index}` : index;
      return index > 0 ? [_wrap(matched[index - 1], matchKey), partial] : partial;
    });
    return result;
  } else {
    const _text = cloneDeep(text); // can not modify props, cloneDeep text props;
    if (
      Array.isArray(_text.props.children) &&
      _text.props.children &&
      _text.props.children.length
    ) {
      _text.props.children = _text.props.children.map((element: any, parentIndex: number) => {
        return deepReplace(element, reg, _wrap, parentIndex);
      });
      return _text;
    } else if (_text.props.children) {
      _text.props.children = deepReplace(text.props.children, reg, _wrap, parentIndex);
      return _text;
    }
  }
};

const defaultMath = (match: string, index: string) => {
  return <span className="matched" key={index}>{match}</span>;
};

const DeepMatch: React.SFC<DeepMatchProps> = ({ text, find, wrap }) => {
  if (!text || !find) {
    return <span>{text}</span>;
  }
  const reg = typeof find === 'string' ? RegExp(escapeRegExp(find), 'g') : find;
  const _wrap = wrap || defaultMath;
  const result = deepReplace(text, reg, _wrap);
  return <span>{result}</span>;
};

export default DeepMatch;
