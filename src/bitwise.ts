import { GetVariableInt, GetVariableLong, LongToDouble, DoubleToLong, MASK53 } from "./functions"

/**
 * Returns the result of logically left-shifting.
 *
 * @example
 * ```ts
 * const result = sll(a, b)
 * ```
 * @remarks In-game: sll r? a(r?|num) b(r?|num)
 */
export function sll(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	const vI = GetVariableInt(b)
	if (vI == null) return null
	return LongToDouble(vL << vI % 64n)
}
/**
 * Alias for `sll` (logical shift left).
 *
 * @example
 * ```ts
 * const result = sla(a, b)
 * ```
 * @remarks In-game: sla r? a(r?|num) b(r?|num)
 */
export const sla = sll
/**
 * Returns the result of logically (unsigned) right-shifting.
 *
 * @example
 * ```ts
 * const result = srl(a, b)
 * ```
 * @remarks In-game: srl r? a(r?|num) b(r?|num)
 */
export function srl(a: number, b: number): number | null {
	const vL = GetVariableLong(a, false)
	if (vL == null) return null
	const vI = GetVariableInt(b)
	if (vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
/**
 * Returns the result of arithmetically (signed) right-shifting.
 * Preserves the sign bit.
 *
 * @example
 * ```ts
 * const result = sra(a, b)
 * ```
 * @remarks In-game: sra r? a(r?|num) b(r?|num)
 */
export function sra(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	const vI = GetVariableInt(b)
	if (vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}

/**
 * Returns the bitwise AND of `a` and `b`.
 *
 * @example
 * ```ts
 * const result = and(a, b)
 * ```
 * @remarks In-game: and r? a(r?|num) b(r?|num)
 */
export function and(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	const vI = GetVariableLong(b)
	if (vI == null) return null
	return LongToDouble(vL & vI)
}
/**
 * Returns the bitwise OR of `a` and `b`.
 *
 * @example
 * ```ts
 * const result = or(a, b)
 * ```
 * @remarks In-game: or r? a(r?|num) b(r?|num)
 */
export function or(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	const vI = GetVariableLong(b)
	if (vI == null) return null
	return LongToDouble(vL | vI)
}
/**
 * Returns the bitwise XOR of `a` and `b`.
 *
 * @example
 * ```ts
 * const result = xor(a, b)
 * ```
 * @remarks In-game: xor r? a(r?|num) b(r?|num)
 */
export function xor(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	const vI = GetVariableLong(b)
	if (vI == null) return null
	return LongToDouble(vL ^ vI)
}
/**
 * Returns the bitwise NOR of `a` and `b`.
 *
 * @example
 * ```ts
 * const result = nor(a, b)
 * ```
 * @remarks In-game: nor r? a(r?|num) b(r?|num)
 */
export function nor(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	const vI = GetVariableLong(b)
	if (vI == null) return null
	return LongToDouble(~(vL | vI))
}
/**
 * Returns the bitwise NOT (complement) of `a`.
 *
 * @example
 * ```ts
 * const result = not(a)
 * ```
 * @remarks In-game: not r? a(r?|num)
 */
export function not(a: number): number | null {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	return LongToDouble(~vL)
}

/**
 * Returns a bit-field extracted from `a` starting at index `b` for length `c`.
 * Payload cannot exceed 53 bits in final length.
 *
 * @example
 * ```ts
 * const extracted = ext(a, start, len)
 * ```
 * @remarks In-game: ext r? a(r?|num) b(r?|num) c(r?|num)
 */
export function ext(a: number, b: number, c: number): number | null {
	const vStart = GetVariableInt(b)
	if (vStart === null) return null
	const vLen = GetVariableInt(c)
	if (vLen === null) return null

	if (vLen <= 0n) return null
	if (vStart < 0n) return null
	if (vStart >= 53n) return null
	if (vLen > 53n || vStart + vLen > 53n) return null

	const vL = GetVariableLong(a, false)
	if (vL === null) return null

	const masked = vL & MASK53

	const bitmask = (vLen === 53n ? MASK53 : (1n << vLen) - 1n) << vStart

	const extracted = (masked & bitmask) >> vStart

	return LongToDouble(extracted)
}
/**
 * Returns a new value produced by inserting a bit-field of `a` into `x`
 * starting at index `b` for length `c`. Payload cannot exceed 53 bits in
 * final length.
 *
 * @example
 * ```ts
 * const newValue = ins(x, start, len, value)
 * ```
 * @remarks In-game: ins r? a(r?|num) b(r?|num) c(r?|num)
 * Note: `x` is the value of the target register/index; it is not modified by
 * this function — the function returns the new value when successful.
 */
export function ins(x: number, a: number, b: number, c: number): number | null {
	const vStart = GetVariableInt(a)
	if (vStart === null) return null
	const vLen = GetVariableInt(b)
	if (vLen === null) return null

	if (vLen <= 0n) return null
	if (vStart < 0n) return null
	if (vStart >= 53n) return null
	if (vLen > 53n || vStart + vLen > 53n) return null

	const base = DoubleToLong(BigInt(x), false) & MASK53

	const vValue = GetVariableLong(c, false)
	if (vValue === null) return null

	const val = vValue & MASK53

	const widthMask = vLen === 53n ? MASK53 : (1n << vLen) - 1n
	const regionMask = widthMask << vStart

	const cleared = base & ~regionMask
	const inserted = ((val & widthMask) << vStart) & regionMask
	const result = (cleared | inserted) & MASK53

	return LongToDouble(result)
}
