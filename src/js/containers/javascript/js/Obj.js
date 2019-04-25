import React, { Component } from "react";
import { Accordion, List,  Tabs, WhiteSpace } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

import styles from "../../../../style/es6/obj.less"

class Temstr extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    const tabs = [
      { title: "创建对象" },
      { title: "属性" },
      { title: "对象的三个属性" },
      { title: "对象方法" }
    ];
    const tabs2 = [
      { title: "理解对象" },
      { title: "创建对象" },
      { title: "继承" }
    ];

    return (
      <div style={{ marginTop: 10, marginBottom: 10, textAlign: 'left' }}>
        <Accordion className={styles.obj} onChange={this.onChange}>

          <Accordion.Panel
            header="面向对象"
          >
          <WhiteSpace />
            <div>
              <p>
              在《面向对象分析与设计》这本书中，Grady Booch 替我们做了总结，他认为，从人类的认知角度来说，对象应该是下列事物之一：
              </p>
              <ul>
                <li>一个可以触摸或者可以看见的东西；</li>
                <li>人的智力可以理解的东西；</li>
                <li>可以指导思考或行动（进行想象或施加动作）的东西。</li>
              </ul>
              <p><strong>JavaScript 对象的特征</strong></p>
              <p>总结来看，对象有如下几个特点。</p>
              <ul>
                <li>对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。</li>
                <li>对象有状态：对象具有状态，同一对象可能处于不同状态之下。</li>
                <li>对象具有行为：即对象的状态，可能因为它的行为产生变迁。</li>
              </ul>
              <p>在 JavaScript 中，将状态和行为统一抽象为“属性”</p>
              <p>
                <strong>在实现了对象基本特征的基础上,JavaScript 中对象独有的特色是：对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。</strong>
              </p>
              <p><strong>JavaScript 对象的两类属性</strong></p>
              <p>第一类属性，数据属性</p>
              <ul>
                <li>value：就是属性的值。</li>
                <li>writable：决定属性能否被赋值。</li>
                <li>enumerable：决定 for in 能否枚举该属性。</li>
                <li>configurable：决定该属性能否被删除或者改变特征值。</li>
              </ul>
              <p>第二类属性是访问器（getter/setter）属性</p>
              <ul>
                <li>getter：函数或 undefined，在取属性值时被调用。</li>
                <li>setter：函数或 undefined，在设置属性值时被调用。</li>
                <li>enumerable：决定 for in 能否枚举该属性。</li>
                <li>configurable：决定该属性能否被删除或者改变特征值。</li>
              </ul>
              <p>
              我们通常用于定义属性的代码会产生数据属性，其中的 writable、enumerable、configurable 都默认为 true。我们可以使用内置函数 <strong>Object.getOwnPropertyDescripter</strong> 来查看
              </p>
              <p>
              如果我们要想改变属性的特征，或者定义访问器属性，我们可以使用 <strong>Object.defineProperty</strong>
              </p>
            </div>
          <WhiteSpace />
          </Accordion.Panel>
          <Accordion.Panel
            header="什么是原型"
          >
            <WhiteSpace />
              <div>
                利用原型来描述对象<br />
                基于原型的面向对象系统通过“复制”的方式来创建新对象。<br />
                原型系统的“复制操作”有两种实现思路：<br />
                <ul>
                  <li>一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用；(js)</li>
                  <li>另一个是切实地复制对象，从此两个对象再无关联。</li>
                </ul>
              </div>
            <WhiteSpace />
          </Accordion.Panel>


          <Accordion.Panel
            header="JavaScript的原型"
            className={styles.listMag}
          >
            <div>
              <p>如果我们抛开 JavaScript 用于模拟 Java 类的复杂语法设施（如 new、Function Object、函数的 prototype 属性等），原型系统可以说相当简单，我可以用两条概括</p>
              <ul>
                <li>如果所有对象都有私有字段 [[prototype]]，就是对象的原型；</li>
                <li>读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。</li>
              </ul>
              <p>
              从 ES6 以来，JavaScript 提供了一系列内置函数，以便更为直接地访问操纵原型。三个方法分别为：
              </p>
              <ul>
                <li>Object.create 根据指定的原型创建新对象，原型可以是 null；</li>
                <li>Object.getPrototypeOf 获得一个对象的原型；</li>
                <li>Object.setPrototypeOf 设置一个对象的原型。</li>
              </ul>
              <p>
                <strong>早期版本中的类与原型</strong>
              </p>
              <p>new 操作具体做了哪些事情</p>
              <ul>
                <li>以构造器的 prototype 属性（注意与私有字段 [[prototype]] 的区分）为原型，创建新对象；</li>
                <li>将 this 和调用参数传给构造器，执行；</li>
                <li>如果构造器返回的是对象，则返回，否则返回第一步创建的对象。</li>
              </ul>
              <pre>
                <code>
{`                 
function c1(){
  this.p1 = 1;
  this.p2 = function(){
      console.log(this.p1);
  }
} 
var o1 = new c1;
o1.p2();


function c2(){
}
c2.prototype.p1 = 1;
c2.prototype.p2 = function(){
  console.log(this.p1);
}

var o2 = new c2;
o2.p2();
`} 
                </code>
              </pre>
              <p>Object.create 的不完整的 pollyfill</p>
              <pre>
                <code>
{`        
Object.create = function(prototype) {
  var f = function() {}
  f.prototype = prototype;
  return new f();
}
`} 
                </code>
              </pre>
              <p>犀牛书里的 pollyfill</p>
              <pre>
                <code>
{`       
function inherit(p) {
  if(p==null) throw TypeError();
  if(Object.create) {
    return Object.create(p)
  }
  var t = typeof p;
  if(t!=='object'&&t!=='function') throw TypeError();
  var f = function() {}
  f.prototype = p;
  return new f();
}
`} 
                </code>
              </pre>
              <p>
              没有 Object.create、Object.setPrototypeOf 的早期版本中，new 运算是唯一一个可以指定 [[prototype]] 的方法
              </p>
              <p>
              了解其工作原理，需要首先了解JavaScript中属性的查询和设置机制。
              </p>
              <p>检测属性：</p>
              <ul>
                <li>in操作符(in可以区分不存在的属性和存在但值为undefined的属性。)</li>
                <li>hasOwnPreperty()</li>
                <li>perpertyIsEnumerable()</li>
              </ul>
              <p>
                <strong>ES6 中的类</strong>
              </p>
              <p>
              ES6 中引入了 class 关键字，并且在标准中删除了所有 [[class]] 相关的私有属性描述，类的概念正式从属性升级成语言的基础设施，从此，基于类的编程方式成为了 JavaScript 的官方编程范式。
              </p>
              <pre>
                <code>
{`
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
`}
                </code>
              </pre>
              <p>此外，最重要的是，类提供了继承能力</p>
              <pre>
                <code>
{`
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
`}
                </code>
              </pre>
            </div>
          </Accordion.Panel>

          <Accordion.Panel
            header="JavaScript的对象"
          >
            <ul>
              <li>宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。</li>
              <li>
              <p>内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。</p>
                <ul>
                  <li>固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。</li>
                  <li>原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。</li>
                  <li>普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。</li>
                </ul>
              </li>
            </ul>
          </Accordion.Panel>
          
          <Accordion.Panel
            header="犀牛书里讲对象"
            className={styles.listMag}
          >
            <div>
              <p>
              对象最常见的用法是创建（create）、设置（set）、查找（query）、删除（delete）、检测（test）和枚举（enumerate）它的属性。
              </p>
              
              <Tabs 
                tabs={tabs}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
                initialPage={3}
              >
                <div>
                  <p>可以通过<strong>对象直接量</strong>、<strong>关键字new</strong>和（ECMAScript5中的）<strong>Object.create()</strong>函数来创建对象。</p>
                  <p>所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过JavaScript代码Object.prototype获得对原型对象的引用。通过关键字new和构造函数调用创建的对象的原型就是构造函数的prototype属性的值。因此，同使用{}创建对象一样，通过newObject()创建的对象也继承自Object.prototype。同样，通过newArray()创建的对象的原型就是Array.prototype，通过newDate()创建的对象的原型就是Date.prototype。                  </p>
                  <pre>
                    <code>
{`
const arr = new Array()
arr.__proto__
Array.prototype.isPrototypeOf(arr)
`}
                    </code>
                  </pre>

                  <pre>
                  <code>
{`
//Object.create
function inherit(p) {
  if(p==null) throw TypeError();
  if(Object.create) {
    return Object.create(p)
  }
  var t = typeof p;
  if(t!=='object'&&t!=='function') throw TypeError();
  var f = function() {}
  f.prototype = p;
  return new f();
}
`}
                  </code>
                </pre>
                </div>

                <div>
                  <p><strong>属性的查询和设置</strong></p>
                  <p>作为关联数组的对象</p>
                  <p>js对象都是关联数组</p>
                  <p>继承</p>
                  <p>在JavaScript中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关，这是JavaScript的一个重要特性，该特性让程序员可以有选择地覆盖（override）继承的属性。                  </p>
                  
                  <p><strong>删除属性</strong></p>

                  <p><strong>检测属性</strong></p>
                  <p>for in</p>
                  <p>hasOwnPreperty</p>
                  <p>perpertyIsEnumerable,只有检测到是自有属性且这个属性的可枚举性（enumerableattribute）为true时它才返回true。                  </p>
                  <p>Object.keys()</p>
                  <p>Object.hasOwnPrepertyNames()</p>

                  <p><strong>枚举属性</strong></p>

                  <p><strong>属性getter和setter</strong></p>
                  <pre>
                    <code>
{`
//这个对象有一个可以返回随机数的存取器属性
//例如，表达式"random.octet"产生一个随机数
//每次产生的随机数都在0～255之间
var random={
  get octet(){returnMath.floor(Math.random()*256);},
  get uint16(){returnMath.floor(Math.random()*65536);},
  get int16(){returnMath.floor(Math.random()*65536)-32768;}
};
`}
                    </code>
                  </pre>

                  <p><strong>属性的特性</strong></p>
                  <p>ECMAScript 5中查询和设置这些属性特性的API</p>
                  <ul>
                    <li>可以通过这些API给原型对象添加方法，并将它们设置成不可枚举的，这让它们看起来更像内置方法</li>
                    <li>可以通过这些API给对象定义不能修改或删除的属性，借此“锁定”这个对象</li>
                  </ul>
                  <p>数据属性</p>
                  <ul>
                    <li>值（value）</li>
                    <li>可写性（writable）</li>
                    <li>可枚举性（enumerable）</li>
                    <li>可配置性（configurable）</li>
                  </ul>
                  <p>存取器属性</p>
                  <ul>
                    <li>读取（get）</li>
                    <li>写入（set）</li>
                    <li>可枚举性（enumerable）</li>
                    <li>可配置性（configurable）</li>
                  </ul>
                  <p>Object.getOwnPropertyDescripter: 可以获得某个对象特定属性的属性描述符</p>
                  <ul>
                    <li>如果对象是不可扩展的，则可以编辑已有的自有属性，但不能给它添加新属性。</li>
                    <li>如果属性是不可配置的，则不能修改它的可配置性和可枚举性。</li>
                    <li>如果存取器属性是不可配置的，则不能修改其getter和setter方法，也不能将它转换为数据属性</li>
                    <li>如果数据属性是不可配置的，则不能将它转换为存取器属性</li>
                    <li>如果数据属性是不可配置的，则不能将它的可写性从false修改为true，但可以从true修改为false</li>
                    <li>如果数据属性是不可配置且不可写的，则不能修改它的值。
                    然而可配置但不可写属性的值是可以修改的（实际上是先将它标记为可写的，然后修改它的值，最后转换为不可写的）</li>
                  </ul>
                </div>

                <div>
                  <p>每一个对象都有与之相关的<strong>原型（prototype）</strong>、<strong>类（class）</strong>和<strong>可扩展性（extensibleattribute）</strong>。</p>
                  <p><strong>原型属性</strong></p>

                  <p><strong>类属性</strong></p>

                  <p><strong>可扩展性</strong></p>

                </div>

                <div></div>

              </Tabs>
            </div>
          </Accordion.Panel>
          
          <Accordion.Panel
            header="红宝书里讲对象"
            className={styles.listMag}
          >

          <Tabs 
            tabs={tabs2}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            initialPage={0}
          >
            <div>
              <p><strong>属性类型</strong></p>
              <p>数据属性</p>
              <ul>
                <li>value</li>
                <li>writable</li>
                <li>enumerable</li>
                <li>configurable</li>
              </ul>
              <p>访问器属性</p>
              <ul>
                <li>enumerable</li>
                <li>configurable</li>
                <li>get</li>
                <li>set</li>
              </ul>
            </div>
            <div>
            <p><strong>工厂模式</strong></p>
            <pre>
              <code>
{`
function createPerson(name, age, job ){ 
  var o = new Object(); 
  o.name = name; 
  o.age = age; 
  o.job = job; 
  o.sayName = function(){ alert( this.name); }; 
  return o; 
} 
var person1 = createPerson("Nicholas", 29, "Software Engineer"); 
var person2 = createPerson("Greg", 27, "Doctor");
`}
              </code>
            </pre>
            <p>工厂模式没有解决对象识别的问题（即怎样知道一个对象的类型）。</p>
            <p><strong>构造函数模式</strong></p>
            <pre>
              <code>
{`
function Person(name, age, job ){ 
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){ alert( this.name); }; 
} 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor");
`}
              </code>
            </pre>
            <p>每次创建一个对象就会创建一个同样的function对象</p>
            <p><strong>原型模式</strong></p>
            <pre>
              <code>
{`
function Person(){}
Person.prototype.name="Nicholas";
Person.prototype.age=29;
Person.prototype.job="SoftwareEngineer";
Person.prototype.sayName=function(){alert(this.name);};

var person1=new Person();
person1.sayName();//"Nicholas"
var person2=new Person();
person2.sayName();//"Nicholas"
`}
              </code>
            </pre>
            <p>原型对象</p>
            <ul>
              <li>任何时候只要创建了一个函数,就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。</li>
              <li><em>如何获取Prototype属性</em></li>
              <li><em>对象的__proto__属性</em></li>
              <li><em>isPrototypeOf</em></li>
              <li><em>setPrototypeOf</em></li>
              <li><em>getPrototypeOf</em></li>
              <li><em>hasOwnPreperty</em></li>
            </ul>
            <p>原型与in操作符</p>
            <ul>
              <li><em>for in</em></li>
              <li><em>Object.keys()</em></li>
              <li><em>Object.getOwnPropertyNames()</em></li>
              <li><em></em></li>
            </ul>
            <p><strong>构造函数模式和原型模式</strong></p>
            <pre>
              <code>
{`
function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.friends=["Shelby","Court"];
}

Person.prototype={
  constructor:Person,
  sayName:function(){
    alert(this.name);
    }
  }

var person1=new Person("Nicholas",29,"SoftwareEngineer");
var person2 = new Person("Greg", 27, "Doctor"); 

person1.friends.push("Van");
alert(person1.friends); //"Shelby, Count, Van"
alert(person2.friends); //"Shelby, Count" 
alert( person1.friends === person2.friends); //false 
alert( person1.sayName === person2.sayName); //true
`}
              </code>
            </pre>
            </div>

            <div>
            <p><strong>原型链</strong></p>
            <pre>
              <code>
{`
function SuperType(){
  this.property=true;
}
SuperType.prototype.getSuperValue=function(){
  return this.property;
};

functionSubType(){
  this.subproperty=false;
}
//继承了SuperType
SubType.prototype=new SuperType();
SubType.prototype.getSubValue=function(){
  return this.subproperty;
};

var instance=new SubType();
alert(instance.getSuperValue());//true
`}
              </code>
            </pre>
            <p>原型链的问题：</p>
            
            <pre>
              <code>
{`
function SuperType() {
this.colors = []
}

const st1 = new SuperType()
const st2 = new SuperType()
st1.colors.push('red')

function SubType() {}
SubType.prototype = new SuperType();

const subt1 = new SubType()
const subt2 = new SubType()
subt1.colors.push('red')
`}
              </code>
            </pre>
            <p>子类会"共享"父类构造函数里的属性</p>
            <p>不能像父类的构造函数传参</p>
            <p><strong>借用构造函数</strong></p>
            <pre>
              <code>
{`
function SuperType(name) {
  this.name = name;
  this.colors = [];
}

const st1 = new SuperType('super1')
const st2 = new SuperType('super2')
st1.colors.push('red')

function SubType() {
  SuperType.call(this, 'subtype')
}

const subt1 = new SubType()
const subt2 = new SubType()
subt1.colors.push('red')
`}
              </code>
            </pre>
            </div>
          </Tabs>
          </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}

export default Temstr;