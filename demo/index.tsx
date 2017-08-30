import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HighlightWord from '../src';
require<any>('./index.css');

ReactDOM.render(
  <div>
    <HighlightWord text="测试一下高亮, 文字高亮一下" keyword="高亮" />
  </div>,
  document.getElementById('app')
);
