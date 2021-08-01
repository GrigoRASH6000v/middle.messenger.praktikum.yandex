import range from './range.ts';

function rangeRight(start: number, end: number, step: number): number[] {
  return range(start, end, step).reverse();
}

export default rangeRight;
