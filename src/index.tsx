import * as React from 'react';
import { escapeRegExp } from './utils';
import * as _ from 'lodash';

export interface DeepMatchProps {
  text: string | React.ReactNode;
  find: string | RegExp;
  wrap?: Function;
}

const deepReplace = (text: string | any, reg: RegExp, _wrap: Function) => {
  if (typeof text === 'string') {
    const matched = text.match(reg);
    const result = text.split(reg).map((partial, i) => {
      return i > 0 ? [_wrap(matched[i - 1]), partial] : partial;
    });
    return result;
  } else {
    const _text = _.cloneDeep(text); // can not modify props, cloneDeep text props;
    if (
      Array.isArray(_text.props.children) &&
      _text.props.children &&
      _text.props.children.length
    ) {
      _text.props.children = _text.props.children.map((element: any) => {
        return deepReplace(element, reg, _wrap);
      });
      return _text;
    } else {
      _text.props.children = deepReplace(text.props.children, reg, _wrap);
      return _text;
    }
  }
};

const defaultMath = (match: string) => {
  return <span className="matched">{match}</span>;
};

const DeepMatch: React.SFC<DeepMatchProps> = ({ text, find, wrap }) => {
  if (!text || !find) {
    return <div>{text}</div>;
  }
  const reg = typeof find === 'string' ? RegExp(escapeRegExp(find), 'g') : find;
  const _wrap = wrap || defaultMath;
  const result = deepReplace(text, reg, _wrap);
  return <div>{result}</div>;
};

export default DeepMatch;
