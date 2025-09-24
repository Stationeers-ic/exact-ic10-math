import { GetVariableInt, GetVariableLong, LongToDouble, DoubleToLong } from "./functions"

/**
 * Performs a logical left shift of the 64-bit value in `a` by `b` bits and
 * returns the resulting value (as a number).
 *
 * @example
 * ```ts
 * const result = sll(a, b)
 * ```
 * @remarks In-game: sll r? a(r?|num) b(r?|num)
 */
export function sll(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL << vI % 64n)
}
/**
 * SLA is the same as SLL (logical shift left).
 *
 * @example
 * ```ts
 * const result = sla(a, b)
 * ```
 * @remarks In-game: sla r? a(r?|num) b(r?|num)
 */
export const sla = sll
/**
 * Performs a logical (unsigned) right shift of the 64-bit value in `a` by
 * `b` bits and returns the resulting value.
 *
 * @example
 * ```ts
 * const result = srl(a, b)
 * ```
 * @remarks In-game: srl r? a(r?|num) b(r?|num)
 */
export function srl(a: number, b: number): null | number {
	const vL = GetVariableLong(a, false)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
/**
 * Performs an arithmetic (signed) right shift of the 64-bit value in `a`
 * by `b` bits and returns the resulting value (preserves sign bit).
 *
 * @example
 * ```ts
 * const result = sra(a, b)
 * ```
 * @remarks In-game: sra r? a(r?|num) b(r?|num)
 */
export function sra(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}

/**
 * Performs a bitwise logical AND operation on the binary representation of
 * two values. Each bit of the result is determined by evaluating the
 * corresponding bits of the input values. If both bits are 1, the resulting
 * bit is set to 1. Otherwise the resulting bit is set to 0.
 *
 * @example
 * ```ts
 * const result = and(a, b)
 * ```
 * @remarks In-game: and r? a(r?|num) b(r?|num)
 */
export function and(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL & vI)
}
/**
 * Performs a bitwise logical OR operation on the binary representation of
 * two values. Each bit of the result is determined by evaluating the
 * corresponding bits of the input values. If either bit is 1, the resulting
 * bit is set to 1. If both bits are 0, the resulting bit is set to 0.
 *
 * @example
 * ```ts
 * const result = or(a, b)
 * ```
 * @remarks In-game: or r? a(r?|num) b(r?|num)
 */
export function or(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL | vI)
}
/**
 * Performs a bitwise exclusive OR (XOR) operation between two values. Each
 * bit of the result is 1 when the corresponding bits of the operands are
 * different, and 0 when they are the same.
 *
 * @example
 * ```ts
 * const result = xor(a, b)
 * ```
 * @remarks In-game: xor r? a(r?|num) b(r?|num)
 */
export function xor(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL ^ vI)
}
/**
 * Performs a bitwise logical NOR (NOT OR) operation on the binary
 * representation of two values. If both input bits are 0 the resulting bit
 * is set to 1; otherwise the resulting bit is 0.
 *
 * @example
 * ```ts
 * const result = nor(a, b)
 * ```
 * @remarks In-game: nor r? a(r?|num) b(r?|num)
 */
export function nor(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(~(vL | vI))
}
/**
 * Performs a bitwise logical NOT operation flipping each bit of the input
 * value, resulting in a binary complement. If a bit is 1, it becomes 0,
 * and if a bit is 0, it becomes 1.
 *
 * @example
 * ```ts
 * const result = not(a)
 * ```
 * @remarks In-game: not r? a(r?|num)
 */
export function not(a: number): null | number {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	return LongToDouble(~vL)
}
/**
 * Extracts a bit field from `a`, beginning at bit index `b` for length `c`,
 * and places the extracted value in the register. Payload cannot exceed 53
 * bits in final length.
 *
 * @example
 * ```ts
 * const extracted = ext(a, start, len)
 * ```
 * @remarks In-game: ext r? a(r?|num) b(r?|num) c(r?|num)
 */
export function ext(a: number, b: number, c: number): null | number {
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
 * Inserts a bit field of `a` into the provided register `x`, beginning at
 * bit index `b` for length `c`. Payload cannot exceed 53 bits in final
 * length.
 *
 * @example
 * ```ts
 * const newValue = ins(x, start, len, value)
 * ```
 * @remarks In-game: ins r? a(r?|num) b(r?|num) c(r?|num)
 * Note: `x` is the value of the target register/index; it is not modified by
 * this function — the function returns the new value when successful.
 */
export function ins(x: number, a: number, b: number, c: number): null | number {
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
