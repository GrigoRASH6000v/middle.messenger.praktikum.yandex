const first = list =>{
    if(Array.isArray(list)){
        const length = list.length;
        return length ? list[0] : undefined;
    }
    return undefined
}

export default first
