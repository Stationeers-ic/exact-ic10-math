/**
 * Returns the smallest integer greater than the specified value `a`.
 *
 * @example
 * ```ts
 * const r = ceil(a)
 * ```
 * @remarks In-game: ceil r? a(r?|num)
 */
export function ceil(a: number): number {
	return Math.ceil(a)
}

/**
 * Returns the largest integer less than the specified value `a`.
 *
 * @example
 * ```ts
 * const r = floor(a)
 * ```
 * @remarks In-game: floor r? a(r?|num)
 */
export function floor(a: number): number {
	return Math.floor(a)
}

/**
 * Returns `a` rounded to the nearest integer using IC10 tie-breaking
 * semantics.
 *
 * @example
 * ```ts
 * const r = round(a)
 * ```
 * @remarks In-game: round r? a(r?|num)
 */
export function round(a: number): number {
	if (a % 2 === 0.5 || a % 2 === -1.5) {
		return floor(a)
	}
	return Math.round(a)
}

/**
 * Returns the value `a` with its fractional part removed (truncated).
 *
 * @example
 * ```ts
 * const r = trunc(a)
 * ```
 * @remarks In-game: trunc r? a(r?|num)
 */
export function trunc(a: number): number {
	return Math.trunc(a)
}
