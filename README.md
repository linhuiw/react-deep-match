# React-deep-match

🔍  A deep regex match component for React, support ReactNode match.

React-deep-match support regular expression matches in a ReactDom or a string; and wrap each match a react node, also support custom wrap;

[See the demo](https://linhuiw.github.io/react-deep-match/)


## How To Use

For example:

```javascript
import DeepMatch from 'react-deep-match';

<DeepMatch text='testvalue' find="test" />
// result:
<div><span class="matched">test</span>value</div>
```
Also component support reactNode deep Match

```javascript
<DeepMatch
text={<p>
  <div>testvalue</div>
  <span>valuetest2</span>
</p>}
find="test"
/>
// result:
<div>
  <p>
    <div><span class="matched">test</span>value</div>
    <span>value<span class="matched">test</span>2</span>
  </p>
</div>
```
And component support Regex match, and custom match wrap;
```javascript
<DeepMatch
  text={<p>
    <span>testvalue123test</span>
  </p>}
  find={/[0-9]/g}
  wrap={(matched) => {
    return <i class="number">{matched}</i>;
  }}
/>
// result:
<div><p>
  <span>testvalue<i class="number">{123}</i>test</span>
</p></div>
```
## Installation
```javascript
npm install react-deep-match --save

import DeepMatch from 'react-deep-match';
```

## API
react-deep-match supports these props;

- text(string | ReactNode): Text or ReactNode, you want to search for
- find(string | RegExp): Text or a RegExp, the rules you want to match text
- wrap((match: string, index: string) => string | React.ReactNode): A Function, you want to wrap your matched texts, argument is the matched text

## Related

[padolsey/findAndReplaceDOMText](https://github.com/padolsey/findAndReplaceDOMText) - 🔍 Find and replace DOM text

## License

MIT
