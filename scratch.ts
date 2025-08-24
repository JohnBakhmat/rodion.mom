const chances = {
  MOO: 50,
  HURT1: 20,
  IDLE4: 15,
  HURT3: 5,
  IDLE1: 5,
  STEP1: 5,
};

const scan = (sum: number) => {
  return (value: number) => (sum += value);
};

const cdf = Object.values(chances)
  .map((x) => x / 100)
  .map(scan(0));

console.log(cdf);
