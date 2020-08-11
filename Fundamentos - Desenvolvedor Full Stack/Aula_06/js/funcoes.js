console.log(sum(15, 5));
console.log(compareNumbers(1, 1));
console.log(compareNumbers(1, 2));
console.log(compareNumbers(2, 1));
console.log(superSum(1, 10));
console.log(superSum(9, 100));
console.log(superSum(200, 1000));

function sum(a, b) {
  return a + b;
}

function compareNumbers(a, b) {
  return a > b ? 1 : a < 3 ? -1 : 0;
}

function superSum(from, upTo) {
  var sum = 0;

  for (var index = from; index <= upTo; index++) {
    sum += index;
  }

  return sum;
}
