import { describe, expect, test } from "bun:test"
import def from "../index"
import { sll, sla, srl, sra, and, or, xor, nor, not, ext, ins } from "../bitwise"
import { abs, add, sub, mul, div, mod, pow, sqrt, log, exp, min, max, lerp, move } from "../math"
import { sin, cos, tan, acos, asin, atan, atan2 } from "../tigonometry"
import {
	seq,
	sne,
	slt,
	sle,
	sgt,
	sge,
	seqz,
	snez,
	sltz,
	slez,
	sgtz,
	sgez,
	sap,
	sapz,
	sna,
	snaz,
	snan,
	snanz,
} from "../comparison"

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
		expect(def.move).toBe(move)
	})
	test("contains all trigonometry functions", () => {
		expect(def.sin).toBe(sin)
		expect(def.cos).toBe(cos)
		expect(def.tan).toBe(tan)
		expect(def.acos).toBe(acos)
		expect(def.asin).toBe(asin)
		expect(def.atan).toBe(atan)
		expect(def.atan2).toBe(atan2)
	})
	test("contains all comparison functions", () => {
		expect(def.seq).toBe(seq)
		expect(def.sne).toBe(sne)
		expect(def.slt).toBe(slt)
		expect(def.sle).toBe(sle)
		expect(def.sgt).toBe(sgt)
		expect(def.sge).toBe(sge)
		expect(def.seqz).toBe(seqz)
		expect(def.snez).toBe(snez)
		expect(def.sltz).toBe(sltz)
		expect(def.slez).toBe(slez)
		expect(def.sgtz).toBe(sgtz)
		expect(def.sgez).toBe(sgez)
		expect(def.sap).toBe(sap)
		expect(def.sapz).toBe(sapz)
		expect(def.sna).toBe(sna)
		expect(def.snaz).toBe(snaz)
		expect(def.snan).toBe(snan)
		expect(def.snanz).toBe(snanz)
	})
})
