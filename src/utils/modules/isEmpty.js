function isEmpty(value){
    if (value === undefined || value===null) {
        return true
    }
    if(value instanceof Set || value instanceof Map){
        return !Boolean(value.size)
    }

    switch (typeof value) {
        case 'object':
            return !Boolean(Object.keys(value).length)
        case 'string':
            return !Boolean(value.length)
    }
    return true
}



// console.log(isEmpty(null))
// console.log(isEmpty(true))
// console.log(isEmpty(1))
// console.log(isEmpty([1, 2, 3]))
// console.log(isEmpty({ 'a': 1 }))
// console.log(isEmpty('123'))
// console.log(isEmpty(123))
// console.log(isEmpty(''))
// console.log(isEmpty(0))


let test = new Map()

// let test = {data: "test"}
// console.log(test instanceof Set)
// console.log(test.size)
console.log(!Boolean(test.size))
// console.log(typeof test)





export default isEmpty