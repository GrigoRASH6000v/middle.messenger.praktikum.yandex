export default function get(
  object: any,
  path: string,
  defaultValue: any,
): unknown {
  if (typeof path !== 'string') {
    return;
  }
  const keys = path.split('.');

  let result = object;
  for (const key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
