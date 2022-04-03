const chooseOptimalDistance = (t, k, ls) => {
  if (ls.length < k) {
    return null;
  }

  const amounts = [0];

  for (let a = 0; a < k; a++) {
    const acc = [...amounts];

    for (let i = 0; i < amounts.length; i++) {
      for (let j = 0; j < ls.length; j++) {
        acc.push(amounts[i] + ls[j]);
      }
    }

    amounts.push(...acc);
  }

  const result = amounts.filter((el) => el <= t);

  return result[result.length - 1];
};

console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance(163, 3, [50, 55, 56, 57, 58]));
console.log(chooseOptimalDistance(163, 3, [50]));
