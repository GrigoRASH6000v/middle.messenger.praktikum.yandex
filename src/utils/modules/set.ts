export default function set(
  object: any,
  path: string,
  value: unknown,
  defaultValue: any
): unknown {
  if (typeof path !== 'string') {
    return;
  }
  const keys = path.split('.');

  let result = object;
  for (const key of keys) {
    result = result[key];
    if (result === undefined) {
      return 'target not found';
    }
  }
  console.log('result', result, value);
  result = value;
  return;
}
