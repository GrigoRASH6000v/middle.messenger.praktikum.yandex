function isEmpty(value:any):boolean {
  if (value === undefined || value === null) {
    return true;
  }
  if (value instanceof Set || value instanceof Map) {
    return !value.size;
  }

  switch (typeof value) {
    case 'object':
      return !Object.keys(value).length;
    case 'string':
      return !value.length;
  }
  return true;
}

export default isEmpty;
