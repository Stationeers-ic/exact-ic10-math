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
 * Register = a + b.
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
 * Register = a - b.
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
 * Register = a * b.
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
 * Register = a / b.
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
 * Register = a % b. Returns a non-negative modulus result (JavaScript `%` adjusted
 * to behave like a mathematical modulus where result is in [0, b)).
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
 * Register = a ^ b (power).
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
 * Register = sqrt(a)
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
 * Register = log(a)
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
 * Register = exp(a)
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
 * Register = min(a, b)
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
 * Register = max(a, b)
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
 * Linearly interpolates between `a` and `b` by fraction `t`. `t` is clamped
 * to [0, 1].
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
