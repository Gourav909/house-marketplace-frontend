export const flattenNestedObject = (obj = {}) =>
  Object.keys(obj || {}).reduce((acc, cur) => {
    if (typeof obj[cur] === "object") {
      acc = { ...acc, ...flattenNestedObject(obj[cur]) };
    } else {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
