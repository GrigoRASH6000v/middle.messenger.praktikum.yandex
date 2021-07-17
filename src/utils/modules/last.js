const last = list => {
  if (Array.isArray(list)) {
    const length = list.length;
    return length ? list[length - 1] : undefined;
  }
  return undefined;
};

export default last;
