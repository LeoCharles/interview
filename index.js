function test(person) {
  person.age = 20
  person = {
    name: 'Tom',
    age: 10
  }
  return person
}
const p1 = {
  name: 'Bob',
  age: 30
}
const p2 = test(p1)
console.log(p1) // { name: 'Bob', age: 20 }
console.log(p2) // { name: 'Tom', age: 10 }
// 在函数传参的时候传递的是对象在堆中的内存地址值
// test 函数中的实参 person 是 p1 对象的内存地址, 通过调用 person.age = 20 确实改变了 p1 的值
// 随后 person 变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2