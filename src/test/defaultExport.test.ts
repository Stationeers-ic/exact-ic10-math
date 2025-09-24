import { describe, expect, test } from "bun:test"
import def from "../index"
import { sll, sla, srl, sra, and, or, xor, nor, not, ext, ins } from "../bitwise"
import { abs, add, sub, mul, div, mod, pow, sqrt, log, exp, min, max, lerp } from "../math"

describe("default export", () => {
	expect(def).not.toBeNull()
	test("contains all bitwise functions", () => {
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
	test("contains all math functions", () => {
		expect(def.abs).toBe(abs)
		expect(def.add).toBe(add)
		expect(def.sub).toBe(sub)
		expect(def.mul).toBe(mul)
		expect(def.div).toBe(div)
		expect(def.mod).toBe(mod)
		expect(def.pow).toBe(pow)
		expect(def.sqrt).toBe(sqrt)
		expect(def.log).toBe(log)
		expect(def.exp).toBe(exp)
		expect(def.min).toBe(min)
		expect(def.max).toBe(max)
		expect(def.lerp).toBe(lerp)
	})
})
