import { describe, expect, test } from "bun:test"
import def, { and, nor, not, or, sla, sll, sra, srl, xor, ext, ins } from "../index"

describe("default export", () => {
	test("contains all bitwise functions", () => {
		expect(def).not.toBeNull()
		expect(def.sll).toBe(sll)
		expect(def.sla).toBe(sla)
		expect(def.srl).toBe(srl)
		expect(def.sra).toBe(sra)
		expect(def.and).toBe(and)
		expect(def.or).toBe(or)
		expect(def.xor).toBe(xor)
		expect(def.nor).toBe(nor)
		expect(def.not).toBe(not)
		expect(def.ext).toBe(ext)
		expect(def.ins).toBe(ins)
	})
})
