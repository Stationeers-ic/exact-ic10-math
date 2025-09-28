import { GetVariableInt, GetVariableLong, LongToDouble, DoubleToLong } from "./functions"

/**
 * Returns the result of logically left-shifting the 64-bit value in `a` by `b` bits.
 *
 * @example
 * ```ts
 * const result = sll(a, b)
 * ```
 * @remarks In-game: sll r? a(r?|num) b(r?|num)
 */
export function sll(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
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
 * Returns the result of logically (unsigned) right-shifting the 64-bit value in `a` by `b` bits.
 *
 * @example
 * ```ts
 * const result = srl(a, b)
 * ```
 * @remarks In-game: srl r? a(r?|num) b(r?|num)
 */
export function srl(a: number, b: number): number | null {
	const vL = GetVariableLong(a, false)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
/**
 * Returns the result of arithmetically (signed) right-shifting the 64-bit value in `a` by `b` bits.
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
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}

/**
 * Returns the bitwise AND of `a` and `b` (operating on 64-bit values).
 *
 * @example
 * ```ts
 * const result = and(a, b)
 * ```
 * @remarks In-game: and r? a(r?|num) b(r?|num)
 */
export function and(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL & vI)
}
/**
 * Returns the bitwise OR of `a` and `b` (operating on 64-bit values).
 *
 * @example
 * ```ts
 * const result = or(a, b)
 * ```
 * @remarks In-game: or r? a(r?|num) b(r?|num)
 */
export function or(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL | vI)
}
/**
 * Returns the bitwise XOR of `a` and `b` (operating on 64-bit values).
 *
 * @example
 * ```ts
 * const result = xor(a, b)
 * ```
 * @remarks In-game: xor r? a(r?|num) b(r?|num)
 */
export function xor(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL ^ vI)
}
/**
 * Returns the bitwise NOR of `a` and `b` (operating on 64-bit values).
 *
 * @example
 * ```ts
 * const result = nor(a, b)
 * ```
 * @remarks In-game: nor r? a(r?|num) b(r?|num)
 */
export function nor(a: number, b: number): number | null {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(~(vL | vI))
}
/**
 * Returns the bitwise NOT (complement) of `a` (operating on 64-bit values).
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
	const vL = GetVariableLong(a, false)
	const vStart = GetVariableInt(b)
	const vLen = GetVariableInt(c)
	if (vL == null || vStart == null || vLen == null) return null

	const start = Number(vStart)
	const len = Number(vLen)

	if (len <= 0) return null
	if (start < 0) return null
	if (start >= 53) return null
	if (len > 53 || start + len > 53) return null

	const masked = vL & 0x1fffffffffffffn

	const bitmask = BigInt(len === 53 ? 9007199254740991 : (1n << BigInt(len)) - 1n) << BigInt(start)

	const extracted = (masked & bitmask) >> BigInt(start)

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
	const vLen = GetVariableInt(b)
	const vValue = GetVariableLong(c, false)

	if (vStart == null || vLen == null || vValue == null) return null

	const start = Number(vStart)
	const len = Number(vLen)

	if (len <= 0) return null
	if (start < 0) return null
	if (start >= 53) return null
	if (len > 53 || start + len > 53) return null

	const MASK53 = 0x1fffffffffffffn
	const base = DoubleToLong(BigInt(x), false) & MASK53
	const val = vValue & MASK53

	const widthMask = len === 53 ? MASK53 : (1n << BigInt(len)) - 1n
	const regionMask = widthMask << BigInt(start)

	const cleared = base & ~regionMask
	const inserted = ((val & widthMask) << BigInt(start)) & regionMask
	const result = (cleared | inserted) & MASK53

	return LongToDouble(result)
}
