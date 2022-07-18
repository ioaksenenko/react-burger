interface IAddByIndexOrChangePosition {(
    array: ReadonlyArray<TIngredient>, 
    item: TIngredient, 
    index: number, 
    key: string, 
    val: string | undefined
): ReadonlyArray<TIngredient>};

export const addByIndexOrChangePosition: IAddByIndexOrChangePosition = (array, item, index, key, val) => {
    if (!array.length) return [item];
    const beforItem = array.slice(0, index);
    const afterItem = array.slice(index);
    return index !== -1 
            ? [...exclude(beforItem, key, val), item, ...exclude(afterItem, key, val)] 
            : [...array, item];
}

interface IExclude {(
    array: ReadonlyArray<TIngredient>,
    key: string, 
    val: string | undefined
): ReadonlyArray<TIngredient>};

export const exclude: IExclude = (array, key, val) => {
    return array.filter(item => item[key] !== val);
}