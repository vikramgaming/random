export function initRandint(randFloat: () => number, min: number, max?: number): number {
    if (max === undefined) [max, min] = [min, 0];
    if (min > max) throw new RangeError("min is greater than max");
    
    return Math.floor(randFloat() * (max - min + 1)) + min;
}

export function initFloat(randFloat: () => number, min: number, max?: number): number {
    if (max === undefined) [max, min] = [min, 0];
    if (min > max) throw new RangeError("min is greater than max");
    
    return randFloat() * (min + max) + min;
}

export function initBool(randFloat: () => number, probability: number): boolean {
    if (0 > probability || probability > 1) throw new RangeError("probability must be between 0 and 1");
    
    return randFloat() < probability;
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

export function initTake<A>(randomint: Randint, array: A[], length: number): A[] {
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
    return initTake(randomint, arr, length);
}

export type Chars = string | {
    lowerCase?: boolean,
    upperCase?: boolean,
    numbers?: boolean,
    other?: string
}

export function initChars(randomint: Randint, characters: Chars, length: number): string {
    let c = "";
    if (typeof characters === "object") {
        const { lowerCase, upperCase, numbers, other } = characters;
        if (lowerCase) c += "abcdefghijklmnopqrstuvwxyz";
        if (upperCase) c += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numbers) c += "0123456789";
        if (other) c += other
    } else {
        c += characters;
    }
    
    if (length <= 0) throw new Error("length must be greater than 0");
    if (c.length === 0) throw new Error("cannot pick from empty string");
    
    return Array.from({ length }, _ => c[randomint(0, c.length - 1)]).join("");
}

export function initWeightedChoice<Value>(randFloat: () => number, items: readonly { value: Value; weight: number }[]): Value {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    
    let random = randFloat() * totalWeight;
    
    do {
        for (let item of items) {
            random -= item.weight;
            if (random <= 0) {
                return item.value;
            }
        }
    } while (random > 0);
    
    return items[items.length - 1].value;
}