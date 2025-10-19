/**
 * Returns a pseudorandom number in [0, 1).
 *
 * If a `Random` instance is provided the call delegates to its `nextDouble()` method
 * (deterministic, reproducible stream). If no instance is provided the function
 * falls back to `Math.random()`.
 *
 * @example
 * ```ts
 * const x = rand()         // JS Math.random() when no instance supplied
 * const r = new Random()
 * const y = rand(r)       // deterministic value from c#
 * ```
 * @remarks In-game: rand r? a(r?|num)
 */
function rand(rng: Random): number
function rand(): number
function rand(rng?: Random): number {
	if (rng !== undefined) return rng.nextDouble()
	return Math.random()
}
export { rand }

export class Random {
	readonly seed: number
	private static RANDOM: Random | null = null
	private static readonly MBIG = 2147483647
	private static readonly MSMALL = -2147483648
	private static readonly MSEED = 161803398
	private inext = 0
	private inextp = 21
	private seedArray: Int32Array = new Int32Array(56)
	// private seedArray: number[] = new Array(56).fill(0)
	private _timesSampled = 0
	get timesSampled(): number {
		return this._timesSampled
	}

	constructor(seed?: number) {
		if (seed === undefined) this.seed = Random.GenerateSeed()
		else this.seed = Random.clampTrunc(seed)

		let num = 0
		let num2 = Random.MSEED - (this.seed == Random.MSMALL ? Random.MBIG : Math.abs(this.seed))
		this.seedArray[55] = num2
		let num3 = 1
		for (let i = 1; i < 55; i++) {
			num = (num + 21) % 55
			this.seedArray[num] = num3
			num3 = num2 - num3
			if (num3 < 0) num3 += Random.MBIG
			num2 = this.seedArray[num]
		}
		for (let j = 1; j < 5; j++) {
			for (let k = 1; k < 56; k++) {
				this.seedArray[k] -= this.seedArray[1 + ((k + 30) % 55)]
				// handle underflow
				// this.seedArray[k] = Random.intUnderOverFlow(this.seedArray[k])
				if (this.seedArray[k] < 0) this.seedArray[k] += Random.MBIG
			}
		}
	}
	private static clampTrunc(value: number): number {
		if (value > Random.MBIG) return Random.MBIG
		if (value < Random.MSMALL) return Random.MSMALL
		return Math.trunc(value)
	}
	private static intUnderOverFlow(value: number): number {
		if (value < Random.MSMALL) return value + 0x100000000
		if (value > Random.MBIG) return value - 0x100000000
		return value
	}
	private internalSample(): number {
		this._timesSampled++
		if (++this.inext >= 56) this.inext = 1
		if (++this.inextp >= 56) this.inextp = 1
		let nextVal = this.seedArray[this.inext] - this.seedArray[this.inextp]
		if (nextVal === Random.MBIG) nextVal--
		if (nextVal < 0) nextVal += Random.MBIG
		this.seedArray[this.inext] = nextVal
		return nextVal
	}
	/**
	 * Returns a pseudorandom integer in [0, 2147483647).
	 * use for generating random integers for seeds.
	 */
	public next(): number {
		return this.internalSample()
	}
	/**
	 * Returns a pseudorandom number in [0, 1).
	 * Use for generating random fractions.
	 */
	public nextDouble(): number {
		const x = this.internalSample()
		return x / Random.MBIG
	}
	private static GenerateSeed(): number {
		if (Random.RANDOM === null) Random.RANDOM = new Random(Math.floor(Math.random() * 0x80000000))
		return Random.RANDOM.next()
	}
	public static resetGlobalRandom(newGlobalSeed: number): void
	public static resetGlobalRandom(): void
	public static resetGlobalRandom(newGlobalSeed?: number): void {
		if (newGlobalSeed === undefined) {
			Random.RANDOM = null
			return
		}
		Random.RANDOM = new Random(Random.clampTrunc(newGlobalSeed))
	}
	public static getGlobalRandomSeed(): number | null {
		return Random.RANDOM?.seed ?? null
	}
}
