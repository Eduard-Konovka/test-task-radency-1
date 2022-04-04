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

  return result[result.length - 1];
};

console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance(163, 3, [50]));
console.log(chooseOptimalDistance(163, 3, [50, 55, 56, 57, 58]));
console.log(chooseOptimalDistance(230, 3, [91, 74, 73, 85, 73, 81, 87]));

console.log("\n");

const chooseOptimalDistance2 = (t, k, ls) => {
  if (ls.length < k) {
    return null;
  }

  const amounts = [...ls];

  for (let a = 0; a < k; a++) {
    const acc = [...amounts];

    for (let i = 0; i < amounts.length; i++) {
      for (let j = 0; j < ls.length; j++) {
        acc.push(acc[i] + ls[j]);
      }
    }

    amounts.push(...acc);
  }

  const result = amounts.filter((el) => el <= t).sort((a, b) => a - b);

  return result[result.length - 1];
};

console.log(chooseOptimalDistance2(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance2(163, 3, [50]));
console.log(chooseOptimalDistance2(163, 3, [50, 55, 56, 57, 58]));
console.log(chooseOptimalDistance2(230, 3, [91, 74, 73, 85, 73, 81, 87]));
