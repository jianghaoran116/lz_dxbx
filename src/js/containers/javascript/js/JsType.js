import React, { Component } from "react";
import { Redirect } from 'react-router'
import { Accordion, Tabs, WhiteSpace  } from 'antd-mobile';

import styles from "../../../../style/JSBaseKnowledge/jstype.less"

class JsType extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectStr: false,
      redirectObj: false
    }
  }

  render() {
    if(this.state.redirectStr) {
      return <Redirect push to="/es6/str" />;
    }
    if(this.state.redirectObj) {
      return <Redirect push to="/es6/obj" />;
    }

    const tabs = [
      { title: "抽象值操作" },
      { title: "显式强制类型转换" },
      { title: "隐式强制类型转换" },
      { title: "宽松相等和严格相等" },
    ];

    return (
      <Accordion 
          // defaultActiveKey="0" 
          className={styles.jstype}
      >
        <Accordion.Panel header="空值(null)">
          <pre className={styles.code}>
            <code>
            (!a && typeof a === "object")
            </code>
          </pre>
        </Accordion.Panel>
        <Accordion.Panel header="未定义(undefined)">
          <p>undefined 和 undeclared</p>
          <pre className={styles.code}>
            <code>
              var a;<br/>
              a; // undefined<br/>
              b; // ReferenceError: b is not defined
            </code>
          </pre>
          <p><b>"undefined"和"is not defined"是两码事</b></p>
          <pre className={styles.code}>
            <code>
              var a;<br/>
              typeof a; // "undefined"<br/>
              typeof b; // "undefined"
            </code>
          </pre>
        </Accordion.Panel>
        <Accordion.Panel header="布尔值(boolean)">
        </Accordion.Panel>
        <Accordion.Panel header="数字(number)">
          <div>
          <pre className={styles.code}>
            <code>
              {`0.1 + 0.2 == 0.3: ${(0.1 + 0.2 == 0.3)}`}<br/>
              {`Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON:`}<br/>
              {`${(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON)}`}<br />
              {
`Math.formatFloat = function(f, digit) { 
  var m = Math.pow(10, digit); 
  return parseInt(f * m, 10) / m; 
}`
              }
            </code>
          </pre>
          实际上，这里错误的不是结论，而是比较的方法，正确的比较方法是使用 JavaScript 提供的最小精度值
          </div>
        </Accordion.Panel>
        <Accordion.Panel header="字符串(string)">
          <div>
            字符串是否有最大长度?(2^53 - 1)
            <blockquote>
              2^53是多大呢？大约9PB。V8的heap上限只有2GB不到，允许分配的单个字符串大小上限更只有大约是512MB不到。JS字符串是UTF16编码保存，所以也就是2.68亿个字符。
            </blockquote>
            JavaScript 中的字符串是永远无法变更的，一旦字符串构造出来，无法用任何方式改变字符串的内容，所以字符串具有值类型的特征。
            <br />
            <a
              onClick={()=>{
                this.setState({redirectStr: true});
              }}
              href="javascript: void(0)"
            >
              es6 str
            </a>
          </div>
        </Accordion.Panel>
        <Accordion.Panel header="对象(object)">
          <div>
              太难了
              <a
                onClick={()=>{
                  this.setState({redirectObj: true});
                }}
                href="javascript: void(0)"
              >
                Object
              </a>
              <p>
                Object 是 JavaScript 中最复杂的类型，也是 JavaScript 的核心机制之一。Object 表示对象的意思，它是一切有形和无形物体的总称。
              </p>
              <p>
                在 JavaScript 中，对象的定义是“属性的集合”。属性分为<strong>数据属性</strong>和<strong>访问器属性</strong>，二者都是 key-value 结构，key 可以是字符串或者 Symbol 类型。
              </p>
              <p>
                事实上，JavaScript 中的“类”仅仅是运行时对象的一个私有属性，而 JavaScript 中是无法自定义类型的。
              </p>
              <p>
              JavaScript 中的几个基本类型，都在对象类型中有一个“亲戚”。它们是：
              </p>
              <ul>
                <li>Number；</li>
                <li>String；</li>
                <li>Boolean；</li>
                <li>Symbol。</li>
              </ul>
          </div>
        </Accordion.Panel>
        <Accordion.Panel header="符号(symbol)">
          <div>
            Symbol 是 ES6 中引入的新类型，它是一切非字符串的对象 key 的集合，在 ES6 规范中，整个对象系统被用 Symbol 重塑。
          </div>
        </Accordion.Panel>
        <Accordion.Panel 
          header="类型转换"
          className={styles.listMag}
        >
          <Tabs 
            tabs={tabs}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div>
              <WhiteSpace />
              介绍显式和隐式强制类型转换之前，我们需要掌握字符串、数字和布尔值之间类型转换的基本规则。
              <p>
                <strong>ToString</strong>
                <br/>
                {`String(null): ${String(null)}`}<br/>
                {`String(undefined): ${String(undefined)}`}<br/>
                {`String(true): ${String(true)}`}<br/>
                {`true.toString(): ${true.toString()}`}<br/>
                {`String(1.07*1000*1000*1000*1000*1000*1000*1000): ${String(1.07*1000*1000*1000*1000*1000*1000*1000)}`}<br/>
                {`(1.07*1000*1000*1000*1000*1000*1000*1000).toString(): ${(1.07*1000*1000*1000*1000*1000*1000*1000).toString()}`}<br/>
                {`JSON.stringify("42"): ${JSON.stringify("42")}`}
                {`String(''): ${String('')}`}<br/>
                {`String([]): ${String([])}`}<br/>
                {`Object.prototype.toString.call([]): ${Object.prototype.toString.call([])}`}<br/>
                {`String(['abc']): ${String(['abc'])}`}<br/>
                {`String(['1']): ${String(['1'])}`}<br/>
                {`String(['1', '2']): ${String(['1', '2'])}`}<br/>
                {`String({}): ${String({})}`}<br/>
                {`Object.prototype.toString.call({}): ${Object.prototype.toString.call({})}`}<br/>
                {`String({a: 1}): ${String({a: 1})}`}<br/>
              </p>
              <p>
                <strong>ToNumber</strong><br/>
                {`Number(true): ${Number(true)}`}<br/>
                {`Number(false): ${Number(false)}`}<br/>
                {`Number(null): ${Number(null)}`}<br/>
                {`Number(undefined): ${Number(undefined)}`}<br/>
                {`Number(''): ${Number('')}`}<br/>
                {`Number([]): ${Number([])}`}<br/>
                {`Number(['abc']): ${Number(['abc'])}`}<br/>
                {`Number(['1']): ${Number(['1'])}`}<br/>
                {`Number(['1', '2']): ${Number(['1', '2'])}`}<br/>
                {`Number({}): ${Number({})}`}<br/>
                {`Number({a: 1}): ${Number({a: 1})}`}<br/>
              </p>
              <div>
                <strong>ToBoolean</strong><br/>
                虽然我们可以将1强制类型转换为true，将0强制类型转换为false，反之亦然，但它们并不是一回事。<br/>
                JavaScript规范具体定义了一小撮可以被强制类型转换为false的值。<br/>
                <ul>
                  <li>undefined</li>
                  <li>null</li>
                  <li>+0、-0、NaN</li>
                  <li>''</li>
                  <li>false</li>
                </ul>
              </div>
              <p>
                <strong>ToPrimitive</strong><br/>
                抽象操作ToPrimitive会首先检查该值是否有valueOf()方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用toString()的返回值（如果存在）来进行强制类型转换。<br/>
                <br/>
                从ES5开始，使用Object.create(null)创建的对象[[Prototype]]属性为null，并且没有valueOf()和toString()方法，因此无法进行强制类型转换。<br/>
              </p>
              <WhiteSpace />
            </div>
            <div>
              <WhiteSpace />
              <p>
                <strong>字符串和数字之间的显示转换</strong><br/>
                {`5+ +"3.14": ${5+ +"3.14"}`}<br/>
              </p>
              <p>
                <strong>显示转换数字字符串</strong><br/>
                {`Number("42"): ${Number("42")}`}<br/>
                {`parseInt("42"): ${parseInt("42")}`}<br/>
                {`Number("42a"): ${Number("42a")}`}<br/>
                {`parseInt("42a"): ${parseInt("42a")}`}<br/>
                {`parseInt(1/0, 19): ${parseInt(1/0, 19)}`}<br/>
                {`parseInt(0.000008): ${parseInt(0.000008)}`}<br/>
                {`parseInt(0.0000008): ${parseInt(0.0000008)}`}<br/>
                {`parseInt(false, 16): ${parseInt(false, 16)}`}<br/>
                {`parseInt(parseInt, 16): ${parseInt(parseInt, 16)}`}<br/>
                {`parseInt("0x10", 16): ${parseInt("0x10", 16)}`}<br/>
                {`parseInt("103", 2): ${parseInt("103", 2)}`}<br/>
              </p>
              <p>
                <strong>显示转换为布尔值</strong><br/>
              </p>
              <WhiteSpace />
            </div>
            <div>
            <WhiteSpace />
              <p>
                <strong>字符串和数字之间的隐式强制类型转换</strong><br/>
                {`[1, 2] + [3, 4]: ${[1, 2]+[3, 4]}`}<br/>
                {`[] + {}: ${[]+{}}`}<br/>
                {`{} + []: ${{}+[]}`}<br/>
              </p>
              <p>
                <strong>布尔值到数字的隐式强制类型转换</strong>
              </p>
              <p>
                <strong>隐式强制类型转换为布尔值</strong><br/>
                <strong>|| 和 &&</strong><br/>
                它们的返回值是两个操作数中的一个（且仅一个）。即选择两个操作数中的一个，然后返回它的值。<br/>
                {`42||'abc': ${42||'abc'}`}<br/>
                {`42&&'abc': ${42&&'abc'}`}<br/>
                {`0||abc': ${0||'abc'}`}<br/>
                {`null||abc': ${null||'abc'}`}<br/>
                {`null&&'abc': ${null&&'abc'}`}<br/>
              </p>
              <WhiteSpace />
            </div>
            <div>
            <WhiteSpace />
              <p>
                <strong>字符串和数字之间的相等比较</strong><br/>
                {`"42"==42: ${"42"==42}`}<br/>
                x == y <br/>
                (1)如果Type(x)是数字，Type(y)是字符串，则返回x==ToNumber(y)的结果。<br/>
                (2)如果Type(x)是字符串，Type(y)是数字，则返回ToNumber(x)==y的结果。<br/>
                {`"42"==true: ${"42"==true}`}<br/>
                {`"42"==false: ${"42"==false}`}<br/>
                {`42==true: ${42==true}`}<br/>
                {`42==false: ${42==false}`}<br/>
                (1)如果Type(x)是布尔类型，则返回ToNumber(x)==y的结果；<br/>
                (2)如果Type(y)是布尔类型，则返回x==ToNumber(y)的结果。<br/>
                <strong>null和undefined之间的相等比较</strong><br/>
                {`null==false: ${null==false}`}<br/>
                {`undefined==false: ${undefined==false}`}<br/>
                {`null=="": ${null==""}`}<br/>
                {`undefined=="": ${undefined==""}`}<br/>
                {`null==0: ${null==0}`}<br/>
                {`undefined==0: ${undefined==0}`}<br/>
                <strong>对象和非对象之间的相等比较(装箱、拆箱)</strong><br/>
                (1)如果Type(x)是字符串或数字，Type(y)是对象，则返回x==ToPrimitive(y)的结果；<br/>
                (2)如果Type(x)是对象，Type(y)是字符串或数字，则返回ToPrimitive(x)==y的结果。<br/>
                <strong>比较少见的情况</strong><br/>
                {`"0"==false: ${"0"==false} .`}<em>true</em><br/>
                {`false==0: ${false==0} .`}<em>true</em><br/>
                {`false==[]: ${false==[]} .`}<em>true</em><br/>
                <strong>{`false=={}: ${false=={}} .`}<em>true</em><br/></strong>
                {`""==0: ${""==0} .`}<em>true</em><br/>
                {`""==[]: ${""==0} .`}<em>true</em><br/>
                <strong>{`""==false: ${""==0} .`}<em>false</em><br/></strong>
                <strong>{`0==[]: ${0==[]} .`}<em>false</em><br/></strong>
                <strong>{`0=="": ${0==""} .`}<em>false</em><br/></strong>
                {`0=={}: ${0=={}} .`}<em>false</em><br/>
              </p>
              <p>
                <strong>{`根据规范a<=b被处理为b<a，然后将结果反转。`}</strong>
              </p>
              <WhiteSpace />
            </div>
          </Tabs>
        </Accordion.Panel>
        <Accordion.Panel 
          header="从运行时的角度去看 JavaScript 的类型系统"
          className={styles.listMag}
        >
          <div>
            <blockquote>
              运行时类型是代码实际执行过程中我们用到的类型。
              所有的类型数据都会属于7个类型之一。
              从变量、参数、返回值到表达式中间结果，任何js代码运行过程中产生的数据，都具有运行时类型。
            </blockquote>
          </div>
        </Accordion.Panel>
      </Accordion>
    );
  }
}

export default JsType;