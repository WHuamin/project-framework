## ES6 - class
```
constructor(){}：构造方法
static：静态方法，在class指专属于class本身的方法，而且不会被类的实例所继承。静态方法里的this指向类本身。
  class Foo {
    static num = 1001 //静态属性
    static test() {
          console.log("this is static")
      }
  }
  Foo.test()  // this is static
  let p = new Foo()
  p.test()    // Uncaught TypeError: p.test is not a function

get/set:
  get name(){//用来获取name属性。对象名.name  就会调用该方法
        return this.name;
  }
 
  set name(newName){//用来设置name属性值。对象名.name='值' 就会调用该方法
      this.name = newName;
  }

new.target：这个属性用于表示当函数通过new来调用时（即函数被当做构造函数），new命令作用的那个构造函数是谁。

extends：继承
class Son extends Father{
    constructor(name,heigth){
        super(name);
        this.heigth = heigth;
    }
}
```