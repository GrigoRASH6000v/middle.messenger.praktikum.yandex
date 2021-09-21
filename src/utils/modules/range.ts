function baseRange(start: number, end: number, step: number): number[] {
  let index = -1;
  let length: number = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[++index] = start;
    start += step;
  }

  return result;
}

function range(start = 0, end: number, step: number): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step);
}

export default range;
