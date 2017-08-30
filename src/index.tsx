import * as React from 'react';

export interface HighlightWordProps {
  text: string;
  keyword: string;
}

const HighlightWord: React.SFC<HighlightWordProps> = ({ text, keyword }) => {
  if (!text || !keyword) {
    return <span>{text}</span>;
  }
  const reg = new RegExp(
    keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
    'gi'
  );
  const matched = text.match(reg);
  const result = text.split(reg).map((partial, i) => {
    return i > 0
      ? [<span className="highlight">{matched[i - 1]}</span>, partial]
      : partial;
  });
  return <span>{result}</span>;
};

export default HighlightWord;
