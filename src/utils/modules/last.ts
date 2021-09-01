function last(list: []): unknown | undefined | string {
  if (Array.isArray(list)) {
    const { length } = list;
    return length ? list[length - 1] : undefined;
  }
  return new Error('Передаваемый аргумент, не является массивом');
}

export default last;
