"use strict";
// error:Block-scoped declarations (let, const, function, class) not yet supported outside strict mode，一些ES6里声明的方法必须在严格模式上才能使用，不然会报此错误

const a=1;
// const a=2;
// error:Identifier 'a' has already been declared
// a=2;
// error:Assignment to constant variable.
// 【const是常数变量，即一般在require一个模块的时候用或者定义一些全局常量，一旦定义，无法更改，无法重复赋值】
document.write('a: '+a+'<br />');

let b=1;
// let a=2;
// error:Identifier 'a' has already been declared
// 【let 变量，块作用域，不能重复声明覆盖，限制了变量的作用域，保证变量不会去污染全局变量，所以尽量将var改为用let。】
b=2;
document.write('b: '+b+'<br />');

var c=1;
var c=2;
c=3;
document.write('c: '+c);
