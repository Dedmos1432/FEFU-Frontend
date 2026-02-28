const func = (...args) => {
  return args
    .filter((it, index) => args.indexOf(it) === index)
    .filter((it) => it.toString().length === new Set(it.toString()).size);
};

// const n = [1, 1, 22, 1, 22];

// const func1 = function (...args) {
//   return args.filter((it, index) => args.indexOf(it) === index);
// };
// console.log(func1(1, 22, 1, 22));

// const func2 = function (arr) {
//   return arr.filter((it) => it.length === new Set(it.toString).size);
// };

console.log(func(1, 123, 111, 122));

//создать функцию которая принимает массив чисел , а возвращает массив чисел в котороых нет одмнаковыз цифр (пример [1,123,111,122], res = [1,123])
// let n = [112, 111, 123, 245, 666];

// let c = n.filter((it) => {
//   let strNum = it.toString();
//   let count = [...it.toString()].reduce((num, next) => {
//     if (!num.includes(next)) {
//       return (num = num + next);
//     } else {
//       return num;
//     }
//   }, "");
//   if (strNum.length == count.length) {
//     return true;
//   } else {
//     return false;
//   }
// });

// console.log(c);
