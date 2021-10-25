// omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 }

// omit(obj: Object, fields: string[]): Object
function omit<T extends object>(obj: T, fields: (keyof T)[]) {
    let objEntries = Object.entries(obj);
    fields.forEach(key => {
        objEntries = objEntries.filter(el => {
          return el[0] !== key;
        });
      });
      return objEntries.reduce((newObj:{[key: string]: unknown}, item) => {
        newObj[item[0]] = item[1];
        return newObj;
      }, {});
}
console.log(omit({ name: 'Benjy', age: 18 })

export default omit;

