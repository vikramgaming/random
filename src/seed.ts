import * as fn from "./fn";

export default class SeededRandom {
    private seed: number;

    constructor(seed: string | number) {
        this.seed = this.convertToSeed(seed);
    }
    
    /** change the seed and reset */
    setSeed(seed: string | number): void {
        this.seed = this.convertToSeed(seed);
    }
    /** get the curent seed */
    getSeed(): number {
        return this.seed;
    }

    /** get a float number between 0 and 1 */
    next(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }
    
    /** get an integer between 0 and "max" */
    int(max: number): number;
    /** get an integer between "min" and "max" */
    int(min: number, max: number): number;
    int(min: number, max?: number): number {
        return fn.initRandint(this.next.bind(this), min, max);
    }
    
    /** get a float number between 0 and "max"*/
    float(max: number): number;
    /** get a float number between "min" and "max"*/
    float(min: number, max: number): number;
    float(min: number, max?: number): number {
        return fn.initFloat(this.next.bind(this), min, max);
    }
    
    /** get a boolean with probability */
    bool(probability = 0.5): boolean {
        return fn.initBool(this.next.bind(this), probability);
    }
    
    /** shuffle the array */
    shuffle<A>(array: A[]): void {
        fn.initShuffle(this.int.bind(this), array);
    }
    
    /** return a shuffled array */
    shuffled<A>(array: readonly A[]): A[] {
        return fn.initShuffled(this.int.bind(this), array);
    }
    
    /** return a value from array */
    choice<A>(array: readonly A[]): A {
        return fn.initChoice(this.int.bind(this), array);
    }
    
    /** return multi value from array */
    choices<A>(array: readonly A[], length: number): A[] {
        return fn.initChoices(this.int.bind(this), array, length);
    }
    
    /** get multi value and remove it from the array */
    pick<A>(array: A[], length: number): A[] {
        return fn.initPick(this.int.bind(this), array, length);
    }
    
    /** get multi unique value from array */
    sample<A>(array: A[], length: number): A[] {
        return fn.initSample(this.int.bind(this), array, length);
    }
    
    private convertToSeed(seed: string | number): number {
        if (typeof seed === "number") return seed;
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }
}