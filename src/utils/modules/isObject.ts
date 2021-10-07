export default function isObject(obj) {
  return obj && obj.constructor && obj.constructor === Object;
}
