import * as React from 'react';
import { escapeRegExp } from './utils';
import * as _ from 'lodash';

export interface DeepMatchProps {
  text: string | React.ReactNode;
  find: string | RegExp;
}

const deepReplace = (text: string | any, reg: RegExp) => {
  if (typeof text === 'string') {
    const matched = text.match(reg);
    const result = text.split(reg).map((partial, i) => {
      return i > 0
        ? [<span className="highlight">{matched[i - 1]}</span>, partial]
        : partial;
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
        return deepReplace(element, reg);
      });
      return _text;
    } else {
      _text.props.children = deepReplace(text.props.children, reg);
      return _text;
    }
  }
};

const DeepMatch: React.SFC<DeepMatchProps> = ({ text, find }) => {
  if (!text || !find) {
    return <span>{text}</span>;
  }
  const reg = typeof find === 'string' ? RegExp(escapeRegExp(find), 'g') : find;
  const result = deepReplace(text, reg);
  return <span>{result}</span>;
};

export default DeepMatch;
