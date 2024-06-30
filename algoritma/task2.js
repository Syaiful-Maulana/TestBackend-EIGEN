function longestWord(sentence) {
  let cleanSentence = sentence.replace(/[^\w\s]/gi, '');

  let words = cleanSentence.split(' ');

  let longest = '';
  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }

  return longest;
}

// Contoh penggunaan
const sentence = 'Saya sangat senang mengerjakan soal algoritma';
const hasil = longestWord(sentence);
console.log(`${hasil}: ${hasil.length} karakter`); // jalankan node task2.js
