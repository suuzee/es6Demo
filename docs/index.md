# 从Airbnb代码规范来了解ES6

## Airbnb
`Airbnb` 是一美国的公司，从某种意义讲也使我们的竞争对手哈，最近起了中文名字 `爱彼迎`，今天我们不讨论 `彼迎` 是谁，讨论点其他的。其内部的 `JavaScript` 编码规范，写得比较全面，遵循编码规范和使用语法检测，可以很好的提高代码的可读性，可维护性，并有效的减少一些编码错误，这里学习的是著名的独角兽公司 `Airbnb` 的前端编码规范，该项目是 `Github` 上很受欢迎的一个开源项目，目前获得了快 `5w` 的star。

https://github.com/airbnb/javascript

## ES6

2015年6月17日，ECMAScript 6发布正式版本，即ECMAScript 2015。
既然已经纳入标准，那么肯定在不远的将来成为趋势。

#### ES6在各个浏览器支持的情况

http://kangax.github.io/compat-table/es6/

#### ES6+Babel 在各个浏览器支持的情况

#### 块级作用域

ES6提供两种新的声明模式，`let` 和 `var`。
> Use const for all of your references; avoid using var.  

这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解。
以前我们标记常量经常用

> If you must reassign references, use let instead of var

为什么？因为 `let` 是块级作用域，而 `var` 是函数作用域。
`var` 有变量提升问题。
```javascript
console.log(a); // undefined;
console.log(b); // ReferenceError
var a = 1;
let b = 2;
```
```javascript
// 典型闭包问题
for (var i = 0; i < 5; i ++) {
	setTimeout(function () {
        console.log(i);
	}, 100);
}

for (var i = 0; i < 5; i ++) {
    (function (index) {
	    setTimeout(function () {
            console.log(index);
	    }, 100);
    })(i);
}

// 用了let之后
for (let i = 0; i < 5; i ++) {
	setTimeout(function () {
        console.log(i);
	}, 100);
}
```
在 `for` 头部中的`let i`不仅是为`for`循环本身声明了一个`i`，而且它为循环的每一次迭代都重新声明了一个新的`i`。这意味着在循环迭代内部创建的闭包都分别引用着那些在每次迭代中创建的变量，正如你期望的那样。

#### 字符串

> Use single quotes '' for strings.  
动态字符串最好使用反引号，支持多行字符串，支持变量。

```javascript
function printName (name) {
	return 'My name is ' + name + '!';
}
function printName2 (name) {
	return `My name is ${name}!!`;
}
console.log(printName(su));
// My name is su!
console.log(printName2(ze));
// My name is ze!!
```

#### 解构赋值

使用数组成员优先使用解构赋值。
```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const arr = [1, 2, 3, 4];
const [first, second] = arr;
console.log(`first: ${first}, second: ${second}`);
// first: 1, second: 2
```
函数的参数如果是对象的成员，优先使用解构赋值。
```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
	return `My name is ${firstName} ${lastName}.`;
}
console.log(getFullName({firstName: 'su',lastName: 'ze'}));
// My name is su ze.
```
如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
```javascript
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```
#### Object

单行不带尾逗号，多行要带尾逗号。
```javascript
let obj = {
	a: 1,
	b: 'xx',
	c: `xx`,
};

let name = 'suze';
let person = {
	name,
	age: 23
};

```

咱们都不要尾逗号，因为`sonar`检查会通不过的。

添加属性用`Object.assign`;

```javascript
let obj1 = {a: {aa: 1}, b: 2};
let obj2 = {a: {aa: 3}, c: 4};
obj1 = Object.assign({}, obj1, obj2);
console.log(JSON.stringify(obj1));
// {"a":{"aa":3},"b":2,"c":4}
```

#### Array

使用`...`运算符copy数组
```javascript
const arr = [1, 2, 3];
const arr2 = [...arr];
```

使用`Array.from`，将类数组转化为数组
```javascript
const divs = document.querySelectorAll('div');
const divNodes = Array.from(divs);
```

#### Function

> Use named function expressions instead of function declarations.

因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升。这条规则使得箭头函数可以取代函数表达式。

> When you must use function expressions (as when passing an anonymous function), use arrow function notation.

因为箭头函数创造了新的一个 this 执行环境，通常情况下都能满足你的需求，而且这样的写法更为简洁。
为什么不？如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个函数声明上。

> If the function body consists of a single expression, omit the braces and use the implicit return. Otherwise, keep the braces and use a return statement.  
// 如果函数体只有一行表达式，那么省略花括号，并且使用隐式表达。否则就别省略  

> In case the expression spans over multiple lines, wrap it in parentheses for better readability.  
// 为了更好地可读性，如果有多行表达式应该在括号里面换行。  

> If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include parentheses around arguments for clarity and consistency.   
// 如果只有一个参数，省略括号。否则，为了更清楚和一致性，应该使用括号。  

> Avoid confusing arrow function syntax (=>) with comparison operators (<=, >=).  
// 避免在箭头函数内使用 比较，如果想用就用括号包起来。  

> Never use arguments, opt to use rest syntax ... instead.  
// 不要用arguments，用rest运算符 ... 替代。
因为arguments是类数组，而rest是真正的数组。  

> 使用默认值语法设置函数参数的默认值。

```javascript
let self = this;
let boundMethod = function(...params) {
  return method.apply(self, params);
}

let boundMethod = method.bind(this);

line-height boundMethod = (...params) => method.apply(this, params);


function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
function concatenateAll(...args) {
  return args.join('');
}

function handleThings(opts) {
  opts = opts || {};
}
function handleThings(opts = {}) {
  // ...
}
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

```


#### Map

`Map` 有内建的遍历机制。  
到了 `ES2017` 才引入了跟`Object.keys`配套的`Object.values`和`Object.entries`


```javascript
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```
#### Class
以前的class怎么实现的？  
一个 `function`， 首字母大写，用 `prototype`  
继承：子类的原型指向父类  
```javascript
function Person () {
    // this.xxx = xxx;
}
Person.prototype._getId = function () {
    // xxx
};
function Student () {
    // this.xxx = xxx;
}
// 方式一
Student.prototype = new Person();
// 方式二
function Student () {
    Person.call(this);
}
```
现在的class什么样？
```javascript
class Person {
    constructor () {
        // this.xxx = xxx;
    }
    #getId () {
        // xxx;
    }
}
// # 是代表私有，目前只是一个提案。
class Student extends Person {
    constructor (...args) {
        super(...args);
        // this.xxx = xxx;
    }
}
// super 表示父类的构造函数，子类必须在constructor中调用super方法，否则new的时候会报错。
// 还有一种情况 super 当做对象的时候表示父类的原型对象。
// super 指向 Person.prototype; 不能调用Person内部属性。
```

#### Module

> Always use modules (import/export) over a non-standard module system. You can always transpile to your preferred module system.  
`Modules are the future`

> Do not use wildcard imports.  
// 不要使用通配符，这样保证模块中，有一个默认输出。

如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，就不使用`export default`，不要`export default`与普通的`export`同时使用。
``` javascript
//a.js
export function abc () {
	return 'abc function from a.js';
}
export function bbc () {
	return 'bbc function from a.js';
}
// b.js
export default bbb () {
	return 'bbb function from b.js';
}

// c.js
import {abc, bbc} from 'a';
import bbb from 'b';
console.log(abc()); // abc function from a.js
console.log(bbc()); // bbc function from a.js
console.log(bbb()); // bbb function from b.js
```

#### 题外话
#### Decorator
