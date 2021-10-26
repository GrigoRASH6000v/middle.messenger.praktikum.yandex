export default function set(
  object: { [key: string]: unknown },
  path: string,
  value: unknown,
): unknown {
  if (typeof path !== 'string') {
    return;
  }
  const keys = path.split('.');
  let result = object;
  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      break;
    }
    result = result[keys[i]];
  }
  const lastKey = keys.reverse()[0];
  result[lastKey] = value;
}
