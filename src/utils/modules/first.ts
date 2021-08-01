const first = (list) => {
  if (Array.isArray(list)) {
    return list.length ? list[0] : undefined;
  }
};

export default first;
