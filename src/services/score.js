const getScore = (timer, difficulty) => {
  const HARDDIFF = 3;
  const MEDIUMDIFF = 2;
  const EASYDIFF = 1;
  const points = 10;
  if (difficulty === 'hard') {
    return points + timer * HARDDIFF;
  }
  if (difficulty === 'hard') {
    return points + timer * MEDIUMDIFF;
  }
  return points + timer * EASYDIFF;
};

export default getScore;
