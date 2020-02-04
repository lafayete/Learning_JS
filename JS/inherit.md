## JS 中的继承

JS 并不是一门面向对象语言，其继承方式主要通过原型链来实现。

- 原型链继承

```js
function Father() {
  this.name = "wushibao";
}

function Son() {}
Son.prototype = new Father();
const son = new Son();
console.log(son.name); // wushibao
```

通过原型链模式可以非常容易地实现继承，但是这种方式有两个缺点：
一. 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;

```js
function Father() {
  this.colors = ["white", "red", "blue"];
}

function Son() {}
Son.prototype = new Father();
const son1 = new Son();
son1.colors.push("green");
const son2 = new Son();
console.log(son2.colors); // [ 'white', 'red', 'blue', 'green' ]
```

二. 在创建子类型(例如创建 Son 的实例)时,不能向超类型(例如 Father)的构造函数中传递参数.

- 借用构造函数继承

在子类中调用父类的构造函数

```js
function Father() {
  this.colors = ["white", "red", "blue"];
}

function Son() {
  Father.call(this); //继承了Father,且向父类型传递参数
}

const son1 = new Son();
son1.colors.push("green");
console.log(son1.colors); // [ 'white', 'red', 'blue', 'green' ]
const son2 = new Son();
console.log(son2.colors); // [ 'white', 'red', 'blue']
```

使用构造函数来完成，虽然能避免原型链继承的缺点，但是由于所有的方法必须在构造函数中定义，所以函数复用也就不可能了。

- 组合继承

将原型链继承和借用构造函数继承组合到一起，发挥二者之长。基本做法：使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.

```js
function Father(name) {
  this.name = name;
  this.colors = ["white", "red", "blue"];
}
Father.prototype.sayName = function() {
  console.log(this.name);
};
function Son(name) {
  Father.call(this, name);
}
Son.prototype = new Father();

const son1 = new Son("Jim");

son1.colors.push("green");
console.log(son1.colors);
son1.sayName(); // 'Jim'

const son2 = new Son("Tom");
console.log(son2.colors);
son2.sayName(); // 'Tom'
```

组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 JavaScript 中最常用的继承模式。唯一的缺点在于，调用了两次父类构造函数，造成了不必要的浪费。