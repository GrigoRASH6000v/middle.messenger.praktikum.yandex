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

export default isEmpty