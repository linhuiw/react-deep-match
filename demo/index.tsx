import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DeepMatch from '../src';
import { escapeRegExp } from '../src/utils';
require<any>('./index.css');

const text = (
  <div>
    <p>
    This is a demo for React deep match.
    </p>
    <p>Edit the Expression & Text to see matches. </p>
    <p><b>Sample text for testing:</b></p>
    <i>abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</i>
    <p>0123456789 _+-.,!@#$%^&*();\/|</p>
    <p>12345 -98.7 3.141 .6180 9,000 +42</p>
    <p><span>555.123.4567	+1-(800)-555-2468</span></p>
    <p>foo@demo.net	bar.ba@test.co.uk</p>
    <p>www.demo.com	http://foo.co.uk/</p>
    <div>http://regexr.com/foo.html?q=bar</div>
  </div>
);
const find = /[A-Z]\w+/g;

type State = {
  find: string,
};

class App extends React.Component<any, State> {
  state: State = {
    find: '[0-9]',
  };
  updateInputValue = (evt: any) => {
    this.setState({
      find: evt.target.value
    });
  }
  getRegExp = (value: any) => {
    if (!value) {
      return value;
    }
    let regex;
    try {
			regex = RegExp(value, 'g');
		} catch (e) {
    }
    return regex;
  }
  warpMatches = (match: string, index: string) => {
    return <span className="highlight" key={index}>{match}</span>;
  }
  render() {
    const { find } = this.state;

    return (
      <div>
        <div className="header">Type a regular expression here:
          <input value={String(find)} onChange={this.updateInputValue}/>
        </div>
        <DeepMatch text={text} find={this.getRegExp(find)} wrap={this.warpMatches}/>
        <br/>
        <br/>
        <br/>
        <p className="footer">
          <a href="https://github.com/dt-fe/react-deep-match">React-deep-match github repo</a>
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
