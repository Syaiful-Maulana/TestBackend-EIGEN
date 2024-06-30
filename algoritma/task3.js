function countQueryOccurrences(INPUT, QUERY) {
  let result = [];

  let countMap = {};
  for (let word of INPUT) {
    if (!countMap[word]) {
      countMap[word] = 0;
    }
    countMap[word]++;
  }

  for (let word of QUERY) {
    if (countMap[word]) {
      result.push(countMap[word]);
    } else {
      result.push(0);
    }
  }

  return result;
}

// Contoh penggunaan
const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const OUTPUT = countQueryOccurrences(INPUT, QUERY);
console.log('OUTPUT =', OUTPUT); // jalankan node task3.js
