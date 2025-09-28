/**
 * Returns the absolute value of `a`.
 *
 * @example
 * ```ts
 * const r = abs(a)
 * ```
 * @remarks In-game: abs r? a(r?|num)
 */
export function abs(a: number): number {
	return Math.abs(a)
}

/**
 * Returns the sum of `a` and `b`.
 *
 * @example
 * ```ts
 * const r = add(a, b)
 * ```
 * @remarks In-game: add r? a(r?|num) b(r?|num)
 */
export function add(a: number, b: number): number {
	return a + b
}

/**
 * Returns the difference of `a` minus `b`.
 *
 * @example
 * ```ts
 * const r = sub(a, b)
 * ```
 * @remarks In-game: sub r? a(r?|num) b(r?|num)
 */
export function sub(a: number, b: number): number {
	return a - b
}

/**
 * Returns the product of `a` and `b`.
 *
 * @example
 * ```ts
 * const r = mul(a, b)
 * ```
 * @remarks In-game: mul r? a(r?|num) b(r?|num)
 */
export function mul(a: number, b: number): number {
	return a * b
}

/**
 * Returns the quotient of `a` divided by `b`.
 *
 * @example
 * ```ts
 * const r = div(a, b)
 * ```
 * @remarks In-game: div r? a(r?|num) b(r?|num)
 */
export function div(a: number, b: number): number {
	return a / b
}
/**
 * Returns the mathematical modulus of `a` mod `b` (result in [0, b)).
 * Adjusts JavaScript's `%` so negative `a` produce non-negative results.
 *
 * @example
 * ```ts
 * const r = mod(a, b)
 * ```
 * @remarks In-game: mod r? a(r?|num) b(r?|num)
 */
export function mod(a: number, b: number): number {
	const x = a % b
	if (x < 0) return x + b
	return x
}
/**
 * Returns `a` raised to the power of `b`.
 *
 * @example
 * ```ts
 * const r = pow(a, b)
 * ```
 * @remarks In-game: pow r? a(r?|num) b(r?|num)
 */
export function pow(a: number, b: number): number {
	return Math.pow(a, b)
}

/**
 * Returns the square root of `a`.
 *
 * @example
 * ```ts
 * const r = sqrt(a)
 * ```
 * @remarks In-game: sqrt r? a(r?|num)
 */
export function sqrt(a: number): number {
	return Math.sqrt(a)
}

/**
 * Returns the natural logarithm (base e) of `a`.
 *
 * @example
 * ```ts
 * const r = log(a)
 * ```
 * @remarks In-game: log r? a(r?|num)
 */
export function log(a: number): number {
	return Math.log(a)
}

/**
 * Returns e raised to the power of `a`.
 *
 * @example
 * ```ts
 * const r = exp(a)
 * ```
 * @remarks In-game: exp r? a(r?|num)
 */
export function exp(a: number): number {
	return Math.exp(a)
}

/**
 * Returns the smaller of `a` and `b`.
 *
 * @example
 * ```ts
 * const r = min(a, b)
 * ```
 * @remarks In-game: min r? a(r?|num) b(r?|num)
 */
export function min(a: number, b: number): number {
	return Math.min(a, b)
}

/**
 * Returns the larger of `a` and `b`.
 *
 * @example
 * ```ts
 * const r = max(a, b)
 * ```
 * @remarks In-game: max r? a(r?|num) b(r?|num)
 */
export function max(a: number, b: number): number {
	return Math.max(a, b)
}
/**
 * Returns the linear interpolation between `a` and `b` by fraction `t`.
 * `t` is clamped to [0, 1].
 *
 * @example
 * ```ts
 * const r = lerp(a, b, t)
 * ```
 * @remarks In-game: lerp r? a(r?|num) b(r?|num) t(r?|num)
 */
export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * min(max(t, 0), 1)
}

/**
 * Returns the provided value (no-op).
 *
 * @example
 * ```ts
 * const r = move(a)
 * ```
 * @remarks In-game: move r? a(r?|num)
 *
 * Note: this function simply returns the input value unchanged.
 */
export function move<T>(a: T): T {
	return a
}
