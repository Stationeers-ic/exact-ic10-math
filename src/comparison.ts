import { float_epsilon } from "./const"
import { abs, max } from "./math"

/**
 * Register = 1 if a == b, otherwise 0
 *
 * @example
 * ```ts
 * const r = seq(a, b)
 * ```
 * @remarks In-game: seq r? a(r?|num) b(r?|num)
 */
export function seq(a: number, b: number): number {
	return a === b ? 1 : 0
}

/**
 * Register = 1 if a != b, otherwise 0
 *
 * @example
 * ```ts
 * const r = sne(a, b)
 * ```
 * @remarks In-game: sne r? a(r?|num) b(r?|num)
 */
export function sne(a: number, b: number): number {
	return a !== b ? 1 : 0
}

/**
 * Register = 1 if a < b, otherwise 0
 *
 * @example
 * ```ts
 * const r = slt(a, b)
 * ```
 * @remarks In-game: slt r? a(r?|num) b(r?|num)
 */
export function slt(a: number, b: number): number {
	return a < b ? 1 : 0
}

/**
 * Register = 1 if a <= b, otherwise 0
 *
 * @example
 * ```ts
 * const r = sle(a, b)
 * ```
 * @remarks In-game: sle r? a(r?|num) b(r?|num)
 */
export function sle(a: number, b: number): number {
	return a <= b ? 1 : 0
}

/**
 * Register = 1 if a > b, otherwise 0
 *
 * @example
 * ```ts
 * const r = sgt(a, b)
 * ```
 * @remarks In-game: sgt r? a(r?|num) b(r?|num)
 */
export function sgt(a: number, b: number): number {
	return a > b ? 1 : 0
}

/**
 * Register = 1 if a >= b, otherwise 0
 *
 * @example
 * ```ts
 * const r = sge(a, b)
 * ```
 * @remarks In-game: sge r? a(r?|num) b(r?|num)
 */
export function sge(a: number, b: number): number {
	return a >= b ? 1 : 0
}

/**
 * Register = 1 if a == 0, otherwise 0
 *
 * @example
 * ```ts
 * const r = seqz(a)
 * ```
 * @remarks In-game: seqz r? a(r?|num)
 */
export function seqz(a: number): number {
	return seq(a, 0)
}

/**
 * Register = 1 if a != 0, otherwise 0
 *
 * @example
 * ```ts
 * const r = snez(a)
 * ```
 * @remarks In-game: snez r? a(r?|num)
 */
export function snez(a: number): number {
	return sne(a, 0)
}

/**
 * Register = 1 if a < 0, otherwise 0
 *
 * @example
 * ```ts
 * const r = sltz(a)
 * ```
 * @remarks In-game: sltz r? a(r?|num)
 */
export function sltz(a: number): number {
	return slt(a, 0)
}

/**
 * Register = 1 if a <= 0, otherwise 0
 *
 * @example
 * ```ts
 * const r = slez(a)
 * ```
 * @remarks In-game: slez r? a(r?|num)
 */
export function slez(a: number): number {
	return sle(a, 0)
}

/**
 * Register = 1 if a > 0, otherwise 0
 *
 * @example
 * ```ts
 * const r = sgtz(a)
 * ```
 * @remarks In-game: sgtz r? a(r?|num)
 */
export function sgtz(a: number): number {
	return sgt(a, 0)
}

/**
 * Register = 1 if a >= 0, otherwise 0
 *
 * @example
 * ```ts
 * const r = sgez(a)
 * ```
 * @remarks In-game: sgez r? a(r?|num)
 */
export function sgez(a: number): number {
	return sge(a, 0)
}

/**
 * Register = 1 if abs(a - b) <= max(c * max(abs(a), abs(b)), float.epsilon * 8), otherwise 0
 *
 * @example
 * ```ts
 * const r = sap(a, b, c)
 * ```
 * @remarks In-game: sap r? a(r?|num) b(r?|num) c(r?|num)
 */
export function sap(a: number, b: number, c: number): number {
	return sle(abs(a - b), max(c * max(abs(a), abs(b)), float_epsilon * 8))
}

/**
 * Register = 1 if |a| <= float.epsilon * 8, otherwise 0
 *
 * @example
 * ```ts
 * const r = sapz(a, b)
 * ```
 * @remarks In-game: sapz r? a(r?|num) b(r?|num)
 */
export function sapz(a: number, b: number): number {
	return sap(a, 0, b)
}

/**
 * Register = 1 if abs(a - b) > max(c * max(abs(a), abs(b)), float.epsilon * 8), otherwise 0
 *
 * @example
 * ```ts
 * const r = sna(a, b, c)
 * ```
 * @remarks In-game: sna r? a(r?|num) b(r?|num) c(r?|num)
 */
export function sna(a: number, b: number, c: number): number {
	return sgt(abs(a - b), max(c * max(abs(a), abs(b)), float_epsilon * 8))
}

/**
 * Register = 1 if |a| > float.epsilon, otherwise 0
 *
 * @example
 * ```ts
 * const r = snaz(a, b)
 * ```
 * @remarks In-game: snaz r? a(r?|num) b(r?|num)
 */
export function snaz(a: number, b: number): number {
	return sna(a, 0, b)
}

/**
 * Register = 1 if a is NaN, otherwise 0
 *
 * @example
 * ```ts
 * const r = snan(a)
 * ```
 * @remarks In-game: snan r? a(r?|num)
 */
export function snan(a: number): number {
	return Number.isNaN(a) ? 1 : 0
}

/**
 * Register = 0 if a is NaN, otherwise 1
 *
 * @example
 * ```ts
 * const r = snanz(a)
 * ```
 * @remarks In-game: snanz r? a(r?|num)
 */
export function snanz(a: number): number {
	return Number.isNaN(a) ? 0 : 1
}
/**
 * Register = b if a != 0, otherwise c
 *
 * @example
 * ```ts
 * const r = select(a, b, c)
 * ```
 * @remarks In-game: select r? a(r?|num) b(r?|num) c(r?|num)
 */
export function select(a: number, b: number, c: number): number {
	return a !== 0 ? b : c
}
