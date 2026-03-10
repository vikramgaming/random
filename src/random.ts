import * as fn from "./fn";
import SeededRandom from "./seed";
export { SeededRandom };

/** get a float number between 0 and 1 */
export function random(): number {
    return Math.random();
}

/** get an integer between 0 and "max" */
export function randint(max: number): number;
/** get an integer between "min" and "max" */
export function randint(min: number, max: number): number;
export function randint(min: number, max?: number): number {
    return fn.initRandint(random, min, max);
}

/** get a float number between 0 and "max"*/
export function uniform(max: number): number;
/** get a float number between "min" and "max"*/
export function uniform(min: number, max: number): number;
export function uniform(min: number, max?: number): number {
    return fn.initFloat(random, min, max);
}

/** get a boolean with probability */
export function bool(probability = 0.5) {
    return fn.initBool(random, probability);
}

/** shuffle the array */
export function shuffle<A>(array: A[]): void {
    fn.initShuffle(randint, array);
}

/** return a shuffled array */
export function shuffled<A>(array: readonly A[]): A[] {
    return fn.initShuffled(randint, array);
}

/** return a value from array */
export function choice<A>(array: readonly A[]): A {
    return fn.initChoice(randint, array);
}

/** return multi value from array */
export function choices<A>(array: readonly A[], length: number): A[] {
    return fn.initChoices(randint, array, length);
}

/** get multi value and remove it from the array */
export function pick<A>(array: A[], length: number): A[] {
    return fn.initPick(randint, array, length);
}

/** get multi unique value from array */
export function sample<A>(array: A[], length: number): A[] {
    return fn.initSample(randint, array, length);
}