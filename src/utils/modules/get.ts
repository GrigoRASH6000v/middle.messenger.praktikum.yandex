export default function get(obj, path, defaultValue) {
  if (typeof path !== 'string') {
    return;
  }
  const keys = path.split('.');

  let result = obj;
  for (const key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
