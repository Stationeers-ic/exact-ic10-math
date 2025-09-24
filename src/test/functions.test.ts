import { describe, expect, test } from "bun:test"
import { DoubleToLong, GetVariableInt, GetVariableLong, LongToDouble } from "../index"

describe("functions", () => {
	test("DoubleToLong", () => {
		expect(DoubleToLong(1n, true)).toBe(1n)
		expect(DoubleToLong(32984672098467n, true)).toBe(32984672098467n)
		expect(DoubleToLong(1n, false)).toBe(1n)
		expect(DoubleToLong(32984672098467n, false)).toBe(32984672098467n)
		expect(DoubleToLong(-1n, true)).toBe(-1n)
		expect(DoubleToLong(-32984672098467n, true)).toBe(-32984672098467n)
		expect(DoubleToLong(-1n, false)).toBe(18014398509481983n)
		expect(DoubleToLong(-32984672098467n, false)).toBe(17981413837383517n)
		expect(DoubleToLong(-9007199254740992n, false)).toBe(0n)
	})
	test("LongToDouble", () => {
		expect(LongToDouble(1n)).toBe(1)
		expect(LongToDouble(10n)).toBe(10)
		expect(LongToDouble(0x1fffffffffffffn)).toBe(0x1fffffffffffff)
		expect(LongToDouble(9007199740991n)).toBe(9007199740991)
		expect(LongToDouble(-1n)).toBe(-1)
		expect(LongToDouble(-10n)).toBe(-10)
		expect(LongToDouble(0x3ffffffffffff6n)).toBe(-10)
		expect(LongToDouble(0x20000000000000n)).toBe(-9007199254740992)
		expect(LongToDouble(0x20000000000001n)).toBe(-9007199254740991)
		expect(LongToDouble(0x20000000000080n)).toBe(-9007199254740864)
		expect(LongToDouble(0x3fffffffffffffn)).toBe(-1)
	})
	test("GetVariableLong", () => {
		// other values are tested in DoubleToLong
		expect(GetVariableLong(1)).toBe(1n)
		expect(GetVariableLong(-1)).toBe(-1n)
		expect(GetVariableLong(2147483648)).toBe(2147483648n)
		expect(GetVariableLong(-2147483649)).toBe(-2147483649n)
		expect(GetVariableLong(9223372036854777000)).toBe(null)
		expect(GetVariableLong(-9223372036854777000)).toBe(null)
	})
	test("GetVariableInt", () => {
		expect(GetVariableInt(1)).toBe(1n)
		expect(GetVariableInt(-1)).toBe(-1n)
		expect(GetVariableInt(2147483648)).toBe(null)
		expect(GetVariableInt(-2147483649)).toBe(null)
		expect(GetVariableInt(9223372036854777000)).toBe(null)
		expect(GetVariableInt(-9223372036854777000)).toBe(null)
	})
})
