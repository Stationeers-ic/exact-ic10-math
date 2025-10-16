import { describe, expect, test } from "bun:test"
import { hashString } from "../crc"
import d from "./crc_devices.json"
import i from "./crc_items.json"
const devices: [string, number][] = d as any
const items: [string, number][] = i as any
describe("CRC32", () => {
	test("devices", () => {
		for (let i = 0; i < devices.length; i++) {
			expect(hashString(devices[i][0])).toBe(devices[i][1])
		}
	})
	test("items", () => {
		for (let i = 0; i < items.length; i++) {
			expect(hashString(items[i][0])).toBe(items[i][1])
		}
	})
})
