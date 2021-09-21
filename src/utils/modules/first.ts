function first(list: unknown): unknown | undefined {
  if (Array.isArray(list)) {
    return list.length > 0 ? list[0] : undefined;
  }
  return undefined;
}

export default first;
