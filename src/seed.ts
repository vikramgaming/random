import * as fn from "./fn";
 import { Chars } from "./fn";

export default class SeededRandom {
    private seed: number;

    constructor(seed: string | number) {
        this.seed = convertToSeed(seed);
        this.next = this.next.bind(this);
        this.int = this.int.bind(this);
        this.float = this.float.bind(this);
    }
    
    /** change the seed and reset */
    setSeed(seed: string | number): void {
        this.seed = convertToSeed(seed);
    }
    /** get the curent seed */
    getSeed(): number {
        return this.seed;
    }
    
    /** clone this class with the current seed */
    clone(): SeededRandom {
        return new SeededRandom(this.seed);
    }

    /** get a float number between 0 and 1 */
    next(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }
    
    /** get an integer between 0 (inclusive) and max (exclusive) */
    int(max: number): number;
    /** get an integer between min (inclusive) and max (exclusive) */
    int(min: number, max: number): number;
    int(min: number, max?: number): number {
        return fn.initRandint(this.next, min, max);
    }
    
    /** get an float between 0 (inclusive) and max (exclusive) */
    float(max: number): number;
    /** get an float between min (inclusive) and max (exclusive) */
    float(min: number, max: number): number;
    float(min: number, max?: number): number {
        return fn.initFloat(this.next, min, max);
    }
    
    /** get a boolean with thw given probability */
    bool(probability = 0.5): boolean {
        return fn.initBool(this.next, probability);
    }
    
    /** shuffle the array */
    shuffle<A>(array: A[]): void {
        fn.initShuffle(this.int, array);
    }
    
    /** return a shuffled array */
    shuffled<A>(array: readonly A[]): A[] {
        return fn.initShuffled(this.int, array);
    }
    
    /** get a value from the array */
    choice<A>(array: readonly A[]): A {
        return fn.initChoice(this.int, array);
    }
    
    /** get multiple values from the array */
    choices<A>(array: readonly A[], length: number): A[] {
        return fn.initChoices(this.int, array, length);
    }
    
    /** get multi value and remove them from the array */
    take<A>(array: A[], length: number): A[] {
        return fn.initTake(this.int, array, length);
    }
    
    /** get multiple unique values from array */
    sample<A>(array: readonly A[], length: number): A[] {
        return fn.initSample(this.int, array, length);
    }
    
    /** get a random characters from the given argument */
    chars(characters: Chars, length: number): string {
        return fn.initChars(this.int, characters, length);
    }
    
    /** get a value from the given weight */
    weightedChoice<Value>(items: readonly { value: Value; weight: number }[]): Value {
        return fn.initWeightedChoice(this.next, items);
    }
}

function convertToSeed(seed: string | number): number {
    if (typeof seed === "number") return seed;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}