function crc32Table() {
	const table = new Uint32Array(256)
	let c: number
	for (let n = 0; n < 256; n++) {
		c = n
		for (let k = 0; k < 8; k++) {
			c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
		}
		table[n] = c
	}
	return table
}

const CRC32_TABLE = crc32Table()

/**
 * Computes a CRC32 hash of the given string and returns it as a number.
 *
 * @example
 * ```ts
 * const h = hashString("hello")
 * ```
 * @remarks In-game: HASH("")
 */
export function hashString(str: string): number {
	const bytes = new TextEncoder().encode(str)
	let crc = 0xffffffff
	for (let i = 0; i < bytes.length; i++) {
		crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
	}
	return crc ^ 0xffffffff
}
