import { DoubleToLong } from "./functions"

/**
 * Packs up to 6 ASCII characters into a number.
 * Returns null for nonvalid inputs.
 *
 * @example
 * ```ts
 * const r = PackAscii6("abc") // 6382179
 * ```
 * @remarks In-game: STR("")
 */
export function PackAscii6(input: string): number | null {
	if (input.length === 0) return null
	let num = 0n
	if (input.length > 6) return null

	for (let i = 0; i < input.length; i++) {
		const charCode = input.charCodeAt(i)
		if (charCode > 127) return null
		num = (num << 8n) | BigInt(charCode)
	}
	return Number(num)
}

/**
 * Unpacks a number produced by `PackAscii6` back into a string.
 *
 * Note: in the game the `signed` flag is always true; the
 * parameter is present for completeness
 *
 * @example
 * ```ts
 * const s = UnpackAscii6(6382179) // "abc"
 * ```
 */
export function UnpackAscii6(input: number, signed: boolean = true): string {
	const num = DoubleToLong(BigInt(input), signed)
	let num2 = 0n
	let num3 = num
	while (num3 > 0n && num2 < 8n) {
		num2++
		num3 >>= 8n
	}
	let result = ""
	for (let i = num2 - 1n; i >= 0n; i--) {
		const shift = i * 8n
		const byte = (num >> shift) & 0xffn
		const charCode = Number(byte)
		result += String.fromCharCode(charCode)
	}
	return result
}
