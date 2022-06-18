export const addByIndexOrChangePosition = (array, item, index, key, val) => {
    if (!array.length) return [item];
    const beforItem = array.slice(0, index);
    const afterItem = array.slice(index);
    return index !== -1 
            ? [...exclude(beforItem, key, val), item, ...exclude(afterItem, key, val)] 
            : [...array, item];
}

export const exclude = (array, key, val) => {
    return array.filter(item => item[key] !== val);
}