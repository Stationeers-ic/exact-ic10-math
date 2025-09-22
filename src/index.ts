import { GetVariableInt, GetVariableLong, LongToDouble, DoubleToLong } from "./functions"

export function sll(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL << vI % 64n)
}
// SLA is same as SLL
export const sla = sll
export function srl(a: number, b: number): null | number {
	const vL = GetVariableLong(a, false)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}
export function sra(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableInt(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL >> vI % 64n)
}

export function and(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL & vI)
}
export function or(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL | vI)
}
export function xor(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(vL ^ vI)
}
export function nor(a: number, b: number): null | number {
	const vL = GetVariableLong(a)
	const vI = GetVariableLong(b)
	if (vL == null || vI == null) return null
	return LongToDouble(~(vL | vI))
}
export function not(a: number): null | number {
	const vL = GetVariableLong(a)
	if (vL == null) return null
	return LongToDouble(~vL)
}
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

export { GetVariableInt, GetVariableLong, LongToDouble, DoubleToLong } from "./functions"
export default { sll, sla, srl, sra, and, or, xor, nor, not, ext, ins }
