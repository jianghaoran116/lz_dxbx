import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace, List } from 'antd-mobile';
import { Redirect } from 'react-router'

const Item = List.Item;
const Brief = Item.Brief;

import dashBoardPng from '../../../assets/images/javascript/jsDashboard.png'

class DashBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectStr: false
    }
  }

  render() {

    if(this.state.redirectStr) {
      return <Redirect push to="/js/jstype" />;
    }

    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title="javascript"
          />
          <Card.Body>
            <div>重学前端之javascript</div>
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title="知识架构图"
          />
          <Card.Body>
            <img
              style={{
                "width": "100%"
              }}
              src={dashBoardPng} 
            />
          <List renderHeader={() => '具体解释'} className="my-list">
            <Item
              // arrow="horizontal"
              wrap
              multipleLine
              onClick={() => {
                this.setState({redirect: true});
              }}
            >
              在 JavaScript 的模块中，首先我们可以把语言按照文法、语义和运行时来拆分，这符合编程语言的一般规律
              <br/>
              用一定的词法和语法，表达一定语义，从而操作运行时
            </Item>
            <Item
              // arrow="horizontal"
              wrap
              multipleLine
              onClick={() => {
                // this.setState({redirect: true});
              }}
            >
              把运行时分为数据结构和算法部分：
              <br/>
              <strong>数据结构</strong>包含类型和实例（JavaScript 的类型系统就是它的 7 种基本类型和 7 种语言类型，实例就是它的内置对象部分）。
              <br/>
              所谓的<strong>算法</strong>，就是 JavaScript 的执行过程。
            </Item>
            <Item
              arrow="horizontal"
              wrap
              multipleLine
              onClick={() => {
                this.setState({redirectStr: true});
              }}
            >
              类型部分
            </Item>
            <Item
              // arrow="horizontal"
              wrap
              multipleLine
              onClick={() => {
                // this.setState({redirectStr: true});
              }}
            >
              执行过程我们则需要按照从大结构到小结构的角度讲解，从最顶层的程序与模块、事件循环和微任务，到函数、再到语句级的执行。我们从粗到细地了解执行过程。
            </Item>
            <Item
              // arrow="horizontal"
              wrap
              multipleLine
              onClick={() => {
                // this.setState({redirectStr: true});
              }}
            >
              实例部分，对 JavaScript 来说类似基础库，JavaScipt 的内置对象多达 150 以上。
            </Item>
            <Item
              // arrow="horizontal"
              wrap
              multipleLine
              onClick={() => {
                // this.setState({redirectStr: true});
              }}
            >
              文法中的语法和语义基本是一一对应关系，在 JavaScript 标准中有一份语法定义表。
            </Item>
          </List>
          </Card.Body>
        </Card>
      </WingBlank>
    );
  }
}

export default DashBoard;