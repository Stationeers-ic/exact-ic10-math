import { describe, expect, test } from "bun:test"
import Default from "../index"
import * as bitwise from "../bitwise"
import * as math from "../math"
import * as trigonometry from "../tigonometry"
import * as comparison from "../comparison"
import * as rounding from "../rounding"
import { rand } from "../rand"

describe("default export", () => {
	expect(Default).not.toBeNull()
	test("contains all bitwise functions", () => {
		// for all functions in bitwise, expect def to have them
		for (const key in bitwise) {
			expect(Default).toHaveProperty(key)
			expect(bitwise).toHaveProperty(key)
			// @ts-ignore
			expect(Default[key]).toBe(bitwise[key])
		}
	})
	test("contains all math functions", () => {
		for (const key in math) {
			expect(Default).toHaveProperty(key)
			expect(math).toHaveProperty(key)
			// @ts-ignore
			expect(Default[key]).toBe(math[key])
		}
	})
	test("contains all trigonometry functions", () => {
		for (const key in trigonometry) {
			expect(Default).toHaveProperty(key)
			expect(trigonometry).toHaveProperty(key)
			// @ts-ignore
			expect(Default[key]).toBe(trigonometry[key])
		}
	})
	test("contains all comparison functions", () => {
		for (const key in comparison) {
			expect(Default).toHaveProperty(key)
			expect(comparison).toHaveProperty(key)
			// @ts-ignore
			expect(Default[key]).toBe(comparison[key])
		}
	})
	test("contains all rounding functions", () => {
		for (const key in rounding) {
			expect(Default).toHaveProperty(key)
			expect(rounding).toHaveProperty(key)
			// @ts-ignore
			expect(Default[key]).toBe(rounding[key])
		}
	})
	test("contains rand", () => {
		expect(Default).toHaveProperty("rand")
		expect(rand).toBeDefined()
		// @ts-ignore
		expect(Default.rand).toBe(rand)
	})
	test("doen't contain other", () => {
		const all = { ...bitwise, ...math, ...trigonometry, ...comparison, ...rounding, rand }
		for (const key in Default) {
			expect(all).toHaveProperty(key)
			// @ts-ignore
			expect(all[key]).toBe(Default[key])
		}
	})
})
