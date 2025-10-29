import { describe, expect, test } from "bun:test"
import { hashString, hashStream } from "../crc"
import d from "./crc_devices.json"
import i from "./crc_items.json"
const devices: [string, number][] = d as any
const items: [string, number][] = i as any
const encoder = new TextEncoder()

function getStream<T extends Uint8Array | string>(data: T, chunk = 1): ReadableStream<T> {
	const stream = new ReadableStream<T>({
		start(controller) {
			for (let i = 0; i < data.length; i += chunk) {
				controller.enqueue(data.slice(i, i + chunk) as T)
			}
			controller.close()
		},
	})
	return stream
}
describe("CRC32", () => {
	describe("string", () => {
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
		describe("stream", () => {
			test("devices/1", async () => {
				for (let i = 0; i < devices.length; i++) {
					const stream = getStream<Uint8Array>(encoder.encode(devices[i][0]), 1)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(devices[i][1])
				}
			})
			test("devices/4", async () => {
				for (let i = 0; i < devices.length; i++) {
					const stream = getStream<Uint8Array>(encoder.encode(devices[i][0]), 4)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(devices[i][1])
				}
			})
			test("items/1", async () => {
				for (let i = 0; i < items.length; i++) {
					const stream = getStream<Uint8Array>(encoder.encode(items[i][0]), 1)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(items[i][1])
				}
			})
			test("items/4", async () => {
				for (let i = 0; i < items.length; i++) {
					const stream = getStream<Uint8Array>(encoder.encode(items[i][0]), 4)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(items[i][1])
				}
			})
		})
	})
	describe("Uint8Array", () => {
		test("devices", () => {
			for (let i = 0; i < devices.length; i++) {
				const encoded = encoder.encode(devices[i][0])
				expect(hashString(encoded)).toBe(devices[i][1])
			}
		})
		test("items", () => {
			for (let i = 0; i < items.length; i++) {
				const encoded = encoder.encode(items[i][0])
				expect(hashString(encoded)).toBe(items[i][1])
			}
		})
		describe("stream", () => {
			test("devices/1", async () => {
				for (let i = 0; i < devices.length; i++) {
					const encoded = encoder.encode(devices[i][0])
					const stream = getStream<Uint8Array>(encoded, 1)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(devices[i][1])
				}
			})
			test("devices/4", async () => {
				for (let i = 0; i < devices.length; i++) {
					const encoded = encoder.encode(devices[i][0])
					const stream = getStream<Uint8Array>(encoded, 4)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(devices[i][1])
				}
			})
			test("items/1", async () => {
				for (let i = 0; i < items.length; i++) {
					const encoded = encoder.encode(items[i][0])
					const stream = getStream<Uint8Array>(encoded, 1)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(items[i][1])
				}
			})
			test("items/4", async () => {
				for (let i = 0; i < items.length; i++) {
					const encoded = encoder.encode(items[i][0])
					const stream = getStream<Uint8Array>(encoded, 4)
					const hash = hashStream(stream)
					expect(hash).resolves.toBe(items[i][1])
				}
			})
		})
	})
})
