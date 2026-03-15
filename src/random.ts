import * as fn from "./fn";
import type { Chars } from './fn';
import SeededRandom from "./seed";
export { SeededRandom };

/** get a float number between 0 and 1 */
export function random(): number {
    return Math.random();
}

/** get an integer between 0 (inclusive) and max (exclusive) */
export function randint(max: number): number;
/** get an integer between min (inclusive) and max (exclusive) */
export function randint(min: number, max: number): number;
export function randint(min: number, max?: number): number {
    return fn.initRandint(random, min, max);
}

/** get a float between 0 (inclusive) and max (exclusive) */
export function uniform(max: number): number;
/** get a float between min (inclusive) and max (exclusive) */
export function uniform(min: number, max: number): number;
export function uniform(min: number, max?: number): number {
    return fn.initFloat(random, min, max);
}

/** get a boolean with the given probability */
export function bool(probability = 0.5) {
    return fn.initBool(random, probability);
}

/** shuffle the array */
export function shuffle<Value>(array: Value[]): void {
    fn.initShuffle(randint, array);
}

/** return a shuffled array */
export function shuffled<Value>(array: readonly Value[]): Value[] {
    return fn.initShuffled(randint, array);
}

/** get a value from the array */
export function choice<Value>(array: readonly Value[]): Value {
    return fn.initChoice(randint, array);
}

/** get multiple values from the array */
export function choices<Value>(array: readonly Value[], length: number): Value[] {
    return fn.initChoices(randint, array, length);
}

/** get multiple values and remove them from the array */
export function take<Value>(array: Value[], length: number): Value[] {
    return fn.initTake(randint, array, length);
}

/** get multi unique values from the array */
export function sample<Value>(array: readonly Value[], length: number): Value[] {
    return fn.initSample(randint, array, length);
}

/** get a random characters from the given argument */
export function chars(characters: Chars, length: number): string{
    return fn.initChars(randint, characters, length);
}

/** get a value from the given weight */
export function weightedChoice<Value>(items: readonly { value: Value; weight: number }[]): Value {
    return fn.initWeightedChoice(random, items);
}