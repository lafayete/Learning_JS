function _LazyMan(name) {
  this.tasks = [];
  var self = this;
  var fn = (function(n) {
    var name = n;
    return function() {
      console.log(`Hi! This is ${name}!`);
      self.next();
    };
  })(name);
  this.tasks.push(fn);
  setTimeout(() => {
    self.next();
  }, 0);
}

_LazyMan.prototype.next = function() {
  let fn = this.tasks.shift();
  fn && fn();
};

_LazyMan.prototype.eat = function(name) {
  var self = this;
  var fn = (function(name) {
    return function() {
      console.log(`Eat ${name} ~`);
      self.next();
    };
  })(name);
  this.tasks.push(fn);
  return this;
};

_LazyMan.prototype.sleep = function(time) {
  var self = this;
  var fn = (function(time) {
    return function() {
      setTimeout(() => {
        console.log(`Wake up after ${time} s!`);
        self.next();
      }, time * 1000);
    };
  })(time);
  this.tasks.push(fn);
  return this;
};

_LazyMan.prototype.sleepFirst = function(time) {
  var self = this;
  var fn = (function(time) {
    return function() {
      setTimeout(() => {
        console.log(`Wake up after ${time} s!`);
        self.next();
      }, time * 1000);
    };
  })(time);
  this.tasks.unshift(fn);
  return this;
};

//封装
function LazyMan(name) {
  return new _LazyMan(name);
}

LazyMan("Hank")
  .sleepFirst(5)
  .eat("supper");
