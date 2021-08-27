[](https://github.com/smileyqp/ts-demo/blob/master/%E8%B4%AA%E5%90%83%E8%9B%87ts.png)




![](https://img-blog.csdnimg.cn/60da40fee5c04581b2a0d03b9a5b159d.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MjczMDU5,size_16,color_FFFFFF,t_70)

#### TS基本类型

- 如果变量的声明和赋值是同事进行，ts可以自动给变量进行类型检测
- 也可以直接使用字面量进行类型声明（但是字面量赋值之后就不能再修改了）

```shell
//也可以直接使用字面量进行类型声明,但是字面量赋值之后就不能再修改了
let a:10;
let b:'fa'|'ma';       //枚举：这样的话b就可以赋值为fa或者ma
b = 'fa'
b = 'ma'
```

- 可以使用｜连接多个类型。联合类型(限制变量在某几个值之间)

```shell
//可以使用｜连接多个类型。联合类型
let a1:boolean|number;
a1 = true;
```

- `any`表示任意类型。一个变量类型设置为any相当于关闭了对该变量的类型检测

```shell
//any表示任意类型
let a2:any;
a2 = 10;
a2 = true;
```

- 隐式`any`：设置变量的时候没有设置类型并且没有赋值那么就默认为any（注意：一般尽量避免使用any）
- `unknown`未知类型的值，并且不可以像any那样，将未知类型的变量赋值给已知类型的变量
  - `unknown`实际上就是一个类型安全的any
  - `unknown`类型的变量不能直接赋值给其他类型的变量
  - 如果一定需要赋值的话，那么在赋值之前要先做一个类型检查

```shell
let c1:unknown
c1 = 'smileyqp'
c1 = 2
c1 = true


let e1:string = '111'
// e1 = c1      会报错

if(typeof c1 === 'string'){
    e1 = c1;
}

//类型断言:可以用来告诉解析器，变量的实际类型
e1 = c1 as 'string'
e1 = <string>c1;
```

- `any`类型的值可以赋值给人以变量不会报错(这也是尽量避免使用any类型的原因之一)

```shell
let d1;
let d2:string = 'smileyqp';
d2 = d1;
```

- 类型断言:可以用来告诉解析器，变量的实际类型
  - 语法：
    - 变量 as 类型
    - <类型>变量

```shell
//具体demo见上上条中demo，有两种写法
e1 = c1 as 'string'
e1 = <string>c1;
```

- void用来表示空，表示无返回值的函数

```shell
//void表示无返回值的函数,function的返回值如果不写就默认为any
function fn():void{
	
}
```

- never表示永远不会返回结果。没有值
- object一般的object在开发的时候是不去使用的，因为js中皆对象

```shell
//object,一般的object在开发的时候是不去使用的，因为js中皆对象
let o:object;
o = {}
o = function(){}

//一般声明object使用这种方式。{}中指定对象中可以包含哪些属性。并且结构是一定得一模一样，多一个不行少一个不行。属性名后面加上问号，表示属性是可选的
//语法：{属性名：属性值}
let ob:{name:string,age?:number}        //声明ob对象，并且定义必有的属性name，如果再赋值的话，不给name会报错
ob = {name:''}          //一定要给name属性，不然会报错，并且值的类型是string

//[propName:string]:any  里面的string是限制属性名为字符串，外面的any指的是值为any类型
let obj:{name:string,[propName:string]:any}     //[propName:string]:any  表示其他属性都是可有可无的任意元素。但是name必须有的
```

- Function
  - 语法：`(形参：类型，形参：类型)=>返回值`

```shel
//语法结构类型：(形参:类型,形参:类型)=>返回值类型
let fnn:Function;
fnn = function(){

}
//函数fnn1有两个参数，参数分别为number和string类型，并且返回值也是number
let fnn1:(a:number,b:string)=>number;   
fnn1 = function(n1:number,n2:number):number{
    return n1+n2;
}
```

- array数组的声明
  - 两种表达方式
    - 类型[]
    - Array<类型>

```shell
//array
//类型数组
let arr:number[]        //表示数字数组
arr = [1,2,3]

let ary:Array<number>
ary = [1,2,3,4,5]
```

- tuple元组：固定长度的数组

```shell
//tuple元组：固定长度的数组
let tu:[string,string,number]
tu = ['1','2',5]
```

- enum枚举

```shell
enum Gender{
    Male = 0,
    Femal = 1
}

let i:{name:string,gender:Gender}
i = {name:'smile',gender:Gender.Femal}

if(i.name === 'smileyqp'){}
```

- &表示同时满足, | 表示满足一个对象就可以

let j: {name:string}&{age:number};  //也就是需要满足这两个值

j = {name:'smileyqp',age:18}

- 类型别名

type myType = 1|2|3|4|5;   //可以给string起一个别名，这样的话可以用myType代替string

let k: myType

let l: 1|2|3|4|5;       //同上

#### 编译选项

- 自动编译文件
  - 编译文件时，使用-w指令后，ts编译器会自动监视文件的变化，并在文件发生变化时候自动对文件进行重新编译

`tsconfig.json`是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译

- 配置选项

  - include

    - 定义希望被编译文件所在的目录
    - 默认值["**/*"]
    - 示例：
      - `"include":["src?/**/*","test/**/*"]`
      - 表示：src和test下的搜会被包含

  - exclude

    - 定义需要被排除在外的目录
    - 默认值["node_modules","brower_components","jspm_packages"]
    - 示例：
      - `"exclude":["./src/hello/**/*"]`
      - 表示：src/hello目录下的都不会被编译

  - extends

    - 定义被继承的配置文件（配置文件很多的时候才用到）
    - 示例
      - `"extends":"./config/base"`
      - 表示：当前配置文件中会自动包含config目录下base.json中的所有配置信息

  - files

    - 指定被编译的文件列表，只有需要编译的文件少时才会用到

  - compilerOptions编译器的选项

    - compilerOptions中包含多个子选项，用来完成对编译的配置

      - 项目选择

        - target

          - 设置ts编译的目标脚本
          - 可选值：ES3、ES5、ES6/ES2015、ES7/ES2016、ES2018、ES2019、ES2020、ESNext
          - 示例

          ```shell
          "compilerOptions":{
            "target":"ES6"
          }
          ```

        - lib

          - 指定代码运行时候所包含的库（宿主环境，一般不动）
          - 可选值：ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2018、ES2019、ES2020、ESNext（表示最新版本的）、DOM、webworker、scripthost…..
          - 示例：

          ```shell
          "compilerOptions":{
            "target":"ES6",
            "lib":["ES6","DOM"],
            "outDir":"dist",
            "outFile":"dist/aaa.js",
            "module":"es2015"
          }
          ```

          - sdasd

        - module

          - 指定要使用的模块化的规范
          - `es2015`、`commonjs`、`UMD`、`AMD`、`System`、`ES2020`、`ESNext`、`None`等

        - outDir：指定编译后文件放在的目录

        - outFile：指定输出文件，可以将多个js合并成一个文件输出（并且如果是要将由模块化的文件合成输出一个文件的话，那么module要设置成amd或者system）

        - allowJs：是否对js文件进行编译，默认是false不会对js文件进行编译

        - checkJs：检查js代码是否符合规范，默认是false

        - removeComments：是否移除注释。默认是false

        - noEmit：不生成编译后的文件，只执行编译过程，默认值false

        - noEmitOnError：报错时不生成编译文件，默认false

        - alwaysStrict：用来设置编译后的文件是否使用严格模式。默认false

        - noImplicitAny：是否补全any，默认是false。为true的时候是表示不允许隐式的any类型

        - strictNullChecks：严格检查空值

        - strict：严格管检查的总开关

#### 面向对象

![](https://img-blog.csdnimg.cn/618798c7423046c2829d48bbd70018fd.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MjczMDU5,size_16,color_FFFFFF,t_70)



##### 类：对象的模型(包含：属性&方法)

- 定义类

```shell
class Person{
  name: string;
  //name = 'smile'可以这样直接写。因为有类型判断
  
  readonly age: number;			//readonly表示只读。否则可以通过它实力去修改
  
  //在属性前加上static可以定义类属性（或者称作静态属性）。静态属性：不需要创建对象就可以使用的属性
  static class:string = 'information system'
  static readonly classmate:string = 'smileyqp'
  
  constructor(name:string,age:number){
    this.name = name;
    this.age = age;
    //this表示当前的实例。在构造函数中当前对象，就是当前新建的对象。
    //构造函数可以通过this向新建的对象添加属性
    this.gender = 'male'
  }
  
  sayhi(){
    console.log('hi')
  }
  //同理如果方法前面加上static，就变成了一个类方法。需要直接通过类去调用
  static sayhello(){
    console.log('hello')
  }
}

const per = new Person();

//调用静态属性。静态属性只能类自己去调用，不能用它的实例进行调用
console.log(Person.class);

//调用实例属性
console.log(per.name);
```

- 构造函数
  - 构造函数中：this表示当前的实例。在构造函数中当前对象，就是当前新建的对象。

- 继承
  - 使用继承后，子类将会拥有父类的所有属性和方法
  - 方法重写：如果子类添加了和父类中相同的方法，那么子类中的方法会覆盖父类中的方法

```shell
class Student extends Person{		//继承。使用继承后，子类将会拥有父类的所有属性和方法
  run(){
    console.log(`${this.name} is running`)
  }
}
```

- super关键字
  - 类的方法中super就表示当前类的父类
  - 如果在子类中写了constructor那么必须对父类的构造函数进行调用。因为写了相当于覆盖了弗雷德构造函数方法。

```shell
class Student extends Person{		//继承。使用继承后，子类将会拥有父类的所有属性和方法
  constructor(name:string,age:number){
    super(name,age);
  }
  run(){
    console.log(`${this.name} is running`)
  }
}
```

- 抽象类abstract
  - 以abstract开头的类是抽象类。抽象类和其他类区别不大，只是不能创建对象
  - 抽象类是专门被用来**继承**的类
  - 抽象类中可以添加抽象方法

```shell
abstract class Animal{		//继承。使用继承后，子类将会拥有父类的所有属性和方法
  constructor(name:string,age:number){
  	this.name = name;
  	this.age = age;
  }
  abstract run(){
    console.log(`${this.name} is running`)
  }
}
```

- 抽象方法
  - 抽象方法用abstract开头，没有方法体
  - 抽象方法**只能定义在抽象类中**，并且**子类必须对抽象方法进行重写**

```shell
class Cat extends Animal{
  run(){
    console.log('cat say hello')
  }
}
```

- 接口interface(定义一个规范，对类的限制)
  - 接口就是用来定义一个类的结构。用来**定义一个类中应该包含哪些属性和方法**
  - 同时**接口也可以当作类型声明去使用**（类似于普通类型声明）
  - **接口可以重复声明，并且效果是多个声明的接口的合并的**
  - **接口可以在定义类的时候去限制类的结构**
  - 接口中的所有的属性都不能有实际的值，**接口只定义对象的结构而不考虑实际的值**
  - 不同点在于抽象类中可以有抽象方法也可以有实际的方法，并且可以有实际的值
  - **接口中所有的方法都是抽象的方法**

```shell
interface myInterface{
  name:string;
  age:number;
}

interface myInterface{
  gender:string
}

const obj:myInterface = {
  name:'smileyqp';
  age:12; 
  gender:'male';
}


interface myInter{
  name:string;
  sayHello():void;
}
```

```shell
//实现接口使用implements这个关键字(实现接口：使类满足接口要求)
class myIn implements myInter{
  name:string;
  constructor(name){
    this.name = name;
  }
  sayHello(){
    console.log('say hello')
  }
}
```

```shell
//描述一个对象类型
type myType = {
  name:string;
  age:number;
}
```

- 属性的封装

  - 属性修饰符：

    - protect：受保护的属性，只能在当前类以及当前类和当前类的子类中访问（修改）

    - public：修饰的属性可以在任意位置访问（修改），是默认的

    - private：私有属性，只能在类的内部进行访问（修改）

      - 可以在类中添加方法，使得私有属性可以在类的外部被访问（修改）。此时虽然也可以对类的内部属性进行修改，但是此时控制权在类上面。
      - 属性存取器
        - getter方法用来读取数据
        - setter方法用来读取数据
      - ts设置getter方法的方式

      ```shell
      get name(){
        return this._name;
      }
      
      set name(val:string){
        this._name = val;
      }
      
      //这样的话可以直接用.name进行获取属性;也可以直接.name进行设置属性
      ```

      ```shell
      class B{
        name:string;
        age:number;
        constructor(name:string,age:number){
          this.name = name;
          this.age = age;
        }
      }
      
      //等同于。可以直接将属性定义在构造函数中
      class C{
        constructor(public name:string,public age:number){
          
        }
      }
      ```

      

      - Assay

```shell
(function(){
  class Person{
  	//ts可以在属性前面加上属性的修饰符（比如：static、readonly）
  	private _name:string;
  	private _age:number;
    constructor(name:string,age:number){
      this._name = name;
      this._age = age;
    }
    //定义一个方法获取类内部私有属性
    getName(){
      return this._name;
    }
    //定义一个方法设置私有属性值
    setName(val:string){
      this._name = val;
    }
    
    //ts中设置getter的方式
    get name(){
      return this._name;
    }
    
    set name(val:string){
      this._name = val;
    }
  }
  const per = new Person(name:'smileyqp',age:18)
  console.log(per)
  
  //属性是直接在对象中设置，属性可以被任意修改。将会导致对象中的数据变得非常不安全
  //per.name = 'smile';
  //per.name = 20;
  
  console.log(per.getName())
  per.setName('s')
  
  
})()
```

- 泛型(类型不明确的时候给一个变量，用这个变量来表示类型)
  - 在定义函数或者类的时候，如果遇到类型不明确的时候就可以使用泛型
  - 泛型就是一个不确定类型，需要根据调用情况具体确认
  - **可以直接调用具有泛型的函数**
  - **泛型可以指定多个**

```shell
function fn01(a:number):number{
  return a;
}

//这里定义一个泛型T，具体T是什么类型不清楚。只有具体使用的时候才知道
function fn<T>(a:T):T{
  retrurn a;
}

//可以直接调用具有泛型的函数。可以自动推断泛型的类型
let res = fn(a:10)
let res01 = fn<string>(a:'hello');	//手动指定泛型T为string


//指定两个泛型
function fn02<T,K>(a:T,b:K):T{
  return a;
}
fn02(a:123,b:'hello')
fn02<number,string>(a:123,b:'hello')




interface Inter{
  length:number;
}

//表示T是一个泛型，并且T实现Inter这个接口。因此，按照Inter的定义只要传入的有lenth属性就可以了
function fn3<T extends Inter>(a:T):number{
  return a.length;
}



class MyClass<T>{
  name:T;
  constructor(name:T){
    this.name = name;
  }
}

const mymc = new MyClass<string>(name:'smile');
```













​         













