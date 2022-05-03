const chooseOptimalDistance = (t, k, ls) => {
  if (ls.length < k) {
    return null;
  }

  const amounts = [];

  for (let i = 0; i < ls.length; i++) {
    for (let j = i + 1; j < ls.length; j++) {
      for (let l = j + 1; l < ls.length; l++) {
        amounts.push(ls[i] + ls[j] + ls[l]);
      }
    }
  }

  const result = amounts.filter((el) => el <= t).sort((a, b) => a - b);

  return result[0] ? result[result.length - 1] : null;
};

console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance(163, 3, [50]));
console.log(chooseOptimalDistance(163, 3, [50, 55, 56]));
console.log(chooseOptimalDistance(163, 3, [50, 55, 56, 57, 58]));
console.log(chooseOptimalDistance(230, 3, [91, 74, 73, 85, 73, 81, 87]));

console.log("\n");

const chooseOptimalDistance2 = (t, k, ls) => {
  if (ls.length < k) {
    return null;
  }

  const amounts = [...ls];

  for (let i = 0; i < k; i++) {
    amounts.map((el) => {
      for (let j = i + 1; j < ls.length; j++) {
        amounts.push(el + ls[j]);
      }
    });
  }

  const result = amounts.filter((el) => el <= t).sort((a, b) => a - b);

  return result[0] ? result[result.length - 1] : null;
};

console.log(chooseOptimalDistance2(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance2(163, 3, [50]));
console.log(chooseOptimalDistance2(163, 3, [50, 55, 56]));
console.log(chooseOptimalDistance2(163, 3, [50, 55, 56, 57, 58]));
console.log(chooseOptimalDistance2(230, 3, [91, 74, 73, 85, 73, 81, 87]));
console.log(chooseOptimalDistance2(350, 4, [91, 74, 73, 85, 73, 81, 87]));
console.log(chooseOptimalDistance2(36, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9]));

console.log("\n");

/**
 * Trim n first elements from array
 * @param arr - the array to trim
 * @param n - count elements to trim
 * @returns new cut array
 */

const trimArray = (arr, n) => {
  return arr.filter((el, i) => i > n);
};

/**
 * Recursive method for calculating all combinations
 * First method call calculate all variants for first position,
 * trim array and send it to "second level" calls (in order to avoid duplicate combinations).
 * "Second level" calls calculate all variants for second position, ...
 *
 * @param srcArray - the array from which to take the elem for next position
 * @param accum - array with prev positions
 * @param count - count of all positions
 * @returns [[]] - array of all combinations
 */

const getCombinations = (srcArray, accum, count) => {
  if (accum.length === count) {
    return [accum];
  }

  return srcArray
    .map((elem, index) =>
      getCombinations(trimArray(srcArray, index), [...accum, elem], count)
    )
    .flatMap((arr) => arr);
};

const isPositiveInt = (num) => {
  return typeof num == "number" && Number.parseInt(num) === num && num > 0;
};

/**
 * Calculate the best sum
 * @param t - max sum of distances
 * @param k - count of cities to visit, k> = 1
 * @param ls - list of distances (every distance > 0), ls.length > 0
 * @returns - the biggest sum of k distances, that <= t. If don't exists - null
 */

const chooseBestDistance = (t, k, ls) => {
  if (!isPositiveInt(t)) {
    throw new TypeError("t must be positive integer!");
  }

  if (!isPositiveInt(k) || k < 1) {
    throw new TypeError("k should be integer >= 1!");
  }

  if (typeof ls.length !== "number" || ls.length < 1) {
    throw new TypeError("ls must be an array with length > 0");
  }

  if (!ls.every((elem) => isPositiveInt(elem))) {
    throw new TypeError("ls must be an array with positive integers");
  }

  return getCombinations(ls, [], k)
    .map((arr) => arr.reduce((sum, elem) => sum + elem, 0))
    .filter((sum) => sum <= t)
    .reduce((max, elem) => (elem > max ? elem : max), null);
};

console.log(chooseBestDistance(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseBestDistance(163, 3, [50]));
console.log(chooseBestDistance(163, 3, [50, 55, 56]));
console.log(chooseBestDistance(163, 3, [50, 55, 56, 57, 58]));
console.log(chooseBestDistance(230, 3, [91, 74, 73, 85, 73, 81, 87]));
console.log(chooseBestDistance(350, 4, [91, 74, 73, 85, 73, 81, 87]));
console.log(chooseBestDistance(36, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
