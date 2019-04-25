import React, { Component } from "react";
import { Accordion, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

import styles from "../../../../style/es6/temstr.less"

class Temstr extends Component {

  constructor(props) {
    super(props)

    this.state = {
      res1: '',
      res2: ''
    }
  }

  message = (literals, ...values) => {

    let result = literals.reduce((prev, next, i) => {
      let value = values[i - 1];
      return prev + value + next;
    });

    return result;
  }

  codePointLength = (text) => {
    let result = text.match(/[\s\S]/gu);

    return result ? result.length : 0;
  }

  passthru = (literals, ...substitutions) => {
    console.log(literals)
    console.log(substitutions)
    let result = '';

    for (let i = 0; i < substitutions.length; i++) {
      result += literals[i];
      result += substitutions[i]
    }

    result += literals[literals.length - 1];

    return result
  }

  componentDidMount() {
    let x = 'Hi', y = 'Kevin';
    this.setState({
      res1: this.message`${x}, I am ${y}`
    })

    let count = 10,
      price = 0.25,
      message = this.passthru`${count} items cost $${(count * price).toFixed(2)}.`;

    this.setState({
      res2: message
    })
  }

  render() {
    let arr = [{ value: 1 }, { value: 2 }];
    return (
      <div style={{ marginTop: 10, marginBottom: 10, textAlign: 'left' }}>
        <Accordion className={styles.temstrAccordion} onChange={this.onChange}>

          <Accordion.Panel
            header="字符串"
          >
            {`𠮷.length = ${'𠮷'.length}`}
            <br />
            {`𠮷.charAt(0) = ${'𠮷'.charAt(0)}`}
            <br />
            {`𠮷.charAt(1) = ${'𠮷'.charAt(1)}`}
            <br />
            {`𠮷.charCodeAt(0) = ${'𠮷'.charCodeAt(0)}`}
            <br />
            {`𠮷.charCodeAt(1) = ${'𠮷'.charCodeAt(1)}`}
            <br />
            {`String.fromCharCode(55362) = ${String.fromCharCode(55362)}`}
            <br />
            {`String.fromCharCode(57271) = ${String.fromCharCode(57271)}`}
            <br />
            {`𠮷.codePointAt(0) = ${'𠮷'.codePointAt(0)}`}
            <br />
            {`𠮷.codePointAt(1) = ${'𠮷'.codePointAt(1)}`}
            <br />
            {`String.fromCodePoint(134071) = ${String.fromCodePoint(134071)}`}
            <br />
            {`String.fromCodePoint(57271) = ${String.fromCodePoint(57271)}`}
            <br />
            {`/^.$/.test(𠮷): ${/^.$/.test('𠮷')}`}
            <br />
            {`/^.$/u.test(𠮷): ${/^.$/u.test('𠮷')}`}
            <br />
            {`this.codePointLength('abc'): ${this.codePointLength('abc')}`}
            <br />
            {`this.codePointLength('𠮷bc'): ${this.codePointLength('𠮷bc')}`}
            <br />
            {`'𠮷bc'.length: ${'𠮷bc'.length}`}
            <blockquote>
              使用for of 循环可以正确识别32位的utf-16 字符
                            <pre>
                <code>
                  <br />
                  {
                    `for (let ch of '𠮷a') {
    console.log(ch)
}`
                  }
                // 𠮷
                // a
                </code>
              </pre>
            </blockquote>
          </Accordion.Panel>

          <Accordion.Panel
            header="嵌入变量(支持嵌套)"
            style={{ marginTop: 10 }}
          >
            {
              arr.map((item) => {
                return `<li>${item.value}</li>`
              })
            }
          </Accordion.Panel>
          <Accordion.Panel header="标签模板">
            {this.state.res1}
            <br />
            {this.state.res2}
          </Accordion.Panel>
          <Accordion.Panel
            header="小结"
            style={{ marginTop: 10 }}
          >
            <List>
              <Item
                wrap
                multipleLine
              >
                Es6完全支持了Unicode, 从而JS可以合理的处理UTF-16字符
                <Brief>
                  codePointAt(), String.fromCodePoint()
                </Brief>
              </Item>
              <Item
                wrap
                multipleLine
              >
                正则表达式u的加入从而提供了操作码位的方法
                <Brief>
                  /^.$/u.test('𠮷')
                </Brief>
              </Item>
            </List>
          </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}

export default Temstr;