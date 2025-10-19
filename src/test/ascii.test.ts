import { describe, expect, test } from "bun:test"
import { PackAscii6, UnpackAscii6 } from "../ascii"

describe("PackAscii6", () => {
	test("all single letters", () => {
		for (let i = 0; i < 256; i++) {
			const char = String.fromCharCode(i)
			const packed = PackAscii6(char)

			if (i > 127) expect(packed).toBeNull()
			else expect(packed).toBe(i)
		}
	})
	test("multiple letters", () => {
		expect(PackAscii6("Hello")).toBe(310939249775)
		expect(PackAscii6("World!")).toBe(96136172692513)
		expect(PackAscii6("Bun.js")).toBe(73072127142515)
		expect(PackAscii6("ASCII6")).toBe(71825866967350)
		expect(PackAscii6("ascii6")).toBe(107148216985910)
		expect(PackAscii6("abc")).toBe(6382179)
		expect(PackAscii6("AB")).toBe(16706)
		expect(PackAscii6("\u007fAB")).toBe(8339778)
		expect(PackAscii6("\u007f\u007f\u007f\u007f\u007f\u007f")).toBe(140185576636287)
		expect(PackAscii6("ABCDEFG")).toBeNull()
		expect(PackAscii6("¥")).toBeNull()
		expect(PackAscii6("")).toBeNull()
	})
})

describe("UnpackAscii6", () => {
	test("all single letters", () => {
		for (let i = 1; i < 128; i++) {
			const unpacked = UnpackAscii6(i)
			// if (i > 127) expect(unpacked).toBe("")
			expect(unpacked, `letter: ${i}`).toBe(String.fromCharCode(i))
		}
	})
	test("multiple letters", () => {
		expect(UnpackAscii6(310939249775)).toBe("Hello")
		expect(UnpackAscii6(96136172692513)).toBe("World!")
		expect(UnpackAscii6(73072127142515)).toBe("Bun.js")
		expect(UnpackAscii6(71825866967350)).toBe("ASCII6")
		expect(UnpackAscii6(107148216985910)).toBe("ascii6")
		expect(UnpackAscii6(6382179)).toBe("abc")
		expect(UnpackAscii6(16706)).toBe("AB")
		expect(UnpackAscii6(8339778)).toBe("\u007fAB")
		expect(UnpackAscii6(140185576636287)).toBe("\u007f\u007f\u007f\u007f\u007f\u007f")
		expect(UnpackAscii6(0)).toBe("")
	})
})
