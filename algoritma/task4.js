function diagonalDifference(matrix) {
  let n = matrix.length;
  let primaryDiagonalSum = 0;
  let secondaryDiagonalSum = 0;

  for (let i = 0; i < n; i++) {
    primaryDiagonalSum += matrix[i][i];
  }

  for (let i = 0; i < n; i++) {
    secondaryDiagonalSum += matrix[i][n - 1 - i];
  }

  let difference = Math.abs(primaryDiagonalSum - secondaryDiagonalSum);

  return {
    primaryDiagonal: primaryDiagonalSum,
    secondaryDiagonal: secondaryDiagonalSum,
    difference: difference,
  };
}

// Contoh penggunaan
const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const { primaryDiagonal, secondaryDiagonal, difference } = diagonalDifference(matrix);

console.log(`Diagonal pertama  ${matrix.map((row, i) => row[i]).join(' + ')} = ${primaryDiagonal}`);
console.log(`Diagonal kedua  ${matrix.map((row, i) => row[matrix.length - 1 - i]).join(' + ')} = ${secondaryDiagonal}`);
console.log(`Maka hasilnya adalah: ${primaryDiagonal} - ${secondaryDiagonal} = ${difference}`);
