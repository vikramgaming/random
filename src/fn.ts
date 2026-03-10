export function initRandint(random: () => number, min: number, max?: number): number {
    if (max === undefined) [max, min] = [min, 0];
    if (min > max) throw new RangeError("min is greater than max");
    
    return Math.floor(random() * (max - min + 1)) + min;
}

export function initFloat(random: () => number, min: number, max?: number): number {
    if (max === undefined) [max, min] = [min, 0];
    if (min > max) throw new RangeError("min is greater than max");
    
    return random() * (min + max) + min;
}

export function initBool(random: () => number, probability: number): boolean {
    if (0 > probability || probability > 1) throw new RangeError("probability must be between 0 and 1");
    
    return random() < probability;
}

type Randint = (min: number, max?: number) => number;

export function initShuffle<A>(randomint: Randint, array: A[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomint(0, i);
        
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function initShuffled<A>(randomint: Randint, array: readonly A[]): A[] {
    const arr = [...array];
    initShuffle(randomint, arr);
    
    return arr;
}

export function initChoice<A>(randomint: Randint, array: readonly A[]): A {
    if (array.length === 0) throw new Error("cannot pick from empty array");
    return array[randomint(0, array.length - 1)];
}

export function initChoices<A>(randomint: Randint, array: readonly A[], length: number): A[] {
    return Array.from({ length }, _ => initChoice(randomint, array));
}

export function initPick<A>(randomint: Randint, array: A[], length: number): A[] {
    if (length <= 0 || length > array.length) throw new RangeError("Invalid length");
    
    const result = [];
    
    while (result.length < length) {
        const p = randomint(0, array.length - 1);
        
        result.push(array[p]);
        array.splice(p, 1);
    }
    
    return result;
}

export function initSample<A>(randomint: Randint, array: readonly A[], length: number): A[] {
    const arr = [...array];
    return initPick(randomint, arr, length);
}