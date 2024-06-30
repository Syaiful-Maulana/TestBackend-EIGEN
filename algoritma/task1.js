function reverseAlphabet(input) {
  let alphabetPart = '';
  let numberPart = '';

  for (let char of input) {
    if (isNaN(char)) {
      alphabetPart += char;
    } else {
      numberPart += char;
    }
  }

  let reversedAlphabet = alphabetPart.split('').reverse().join('');

  let result = reversedAlphabet + numberPart;

  return result;
}

// Contoh penggunaan
let input1 = 'NEGIE1';
let hasil1 = reverseAlphabet(input1);
console.log(`Hasil 1: ${hasil1}`); // Jalankan node task1.js
