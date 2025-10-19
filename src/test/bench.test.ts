import { describe, test } from "bun:test"
import { rand, Random } from "../rand"

describe.only("performance", () => {
	test("Random generation speed", () => {
		const r = new Random(1624159124)
		const start = Bun.nanoseconds()
		for (let i = 0; i < 10_000_000; i++) {
			rand(r)
		}
		const elapsed = Bun.nanoseconds() - start
		console.log(`Generated 10M randoms in ${(elapsed / 1_000_000).toFixed(5)}ms`)
	})
})
