export default function isObject(obj): boolean {
  return obj && obj.constructor && obj.constructor === Object;
}
