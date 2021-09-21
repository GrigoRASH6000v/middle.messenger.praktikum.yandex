function isEmpty(value: { [key: string]: unknown } | []): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  if (value instanceof Set || value instanceof Map) {
    return value.size === 0;
  }

  switch (typeof value) {
    case 'object':
      return Object.keys(value).length === 0;
    case 'string':
      return value.length === 0;
  }
  return true;
}

export default isEmpty;
