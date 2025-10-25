> # @stationeers-ic/exact-ic10-math
>
> [![bundle size](https://badgen.net/bundlephobia/minzip/@stationeers-ic/exact-ic10-math) ![tree shaking](https://badgen.net/bundlephobia/tree-shaking/@stationeers-ic/exact-ic10-math) ![dependency count](https://badgen.net/bundlephobia/dependency-count/@stationeers-ic/exact-ic10-math)](https://bundlephobia.com/package/@stationeers-ic/exact-ic10-math)

A library that faithfully implements IC10 math, bitwise, and logic instructions for Stationeers as TypeScript / JavaScript functions. The core goal is to mimic the game's IC10 instruction semantics exactly — including operand orders, bit widths, wrapping behavior, and edge-case results — and to provide clear usage instructions so the functions behave like the in-game instructions.

## Features

**TL;DR** — what this library provides:

-   Faithful IC10 math ops (add, sub, mul, div, pow, etc.) with in-game edge-case semantics
-   Bitwise and field operations (and, or, xor, sll/srl, ins/extr, etc.) matching IC10 behavior
-   CRC32 / string hashing that matches the game's hash function (`hashString`) for device names
-   Deterministic PRNG matching the game's `Random` behavior plus convenience `rand` helpers
-   ASCII packing helpers: `PackAscii6` and `UnpackAscii6` for packing up to 6 ASCII chars into a number
-   ESM and named exports usable in TypeScript and Node/Browser builds

## Installation

```bash
npm install @stationeers-ic/exact-ic10-math
# or
bun add @stationeers-ic/exact-ic10-math
```

## Usage

### Default import

Quickest way to get started:

```ts
import ic10 from "@stationeers-ic/exact-ic10-math"

// basic math
console.log(ic10.add(2, 3)) // 5
console.log(ic10.mul(4, 5)) // 20
console.log(ic10.abs(-7)) // 7
console.log(ic10.round(2.5)) // 2

// bitwise / fields
console.log(ic10.and(5, 3)) // 1
console.log(ic10.ins(0, 1, 2, 3)) // 6
```

### Named imports

For ESM / TypeScript projects:
Better for tree-shaking.

```ts
import { sll, pow, sqrt, lerp, sin, cos, seq, select } from "@stationeers-ic/exact-ic10-math"

console.log(sll(1, 2)) // 4
console.log(pow(2, 3)) // 8
console.log(sqrt(9)) // 3
console.log(lerp(0, 10, 0.5)) // 5
console.log(sin(Math.PI / 2)) // 1
console.log(cos(0)) // 1
console.log(seq(1, 1)) // 1
console.log(select(1, 42, 0)) // 42
```

## API Reference

### String Hashing (CRC32)

The library includes `hashString(str)` — a CRC32 implementation that computes a numeric hash for any string, matching the game's hashing behavior. Useful for converting device names or other string identifiers into numeric values.

```ts
import { hashString } from "@stationeers-ic/exact-ic10-math"

console.log(hashString("StructureAirlockGate")) // 1736080881
```

### ASCII Packing

Helper functions for packing and unpacking short ASCII strings into numbers.

```ts
import { PackAscii6, UnpackAscii6 } from "@stationeers-ic/exact-ic10-math"

console.log(PackAscii6("abc")) // 6382179
console.log(UnpackAscii6(6382179)) // "abc"
```

**Notes:**

-   `PackAscii6` packs up to 6 ASCII characters (8 bits per character) into a single number and returns that numeric value. It returns `null` for invalid inputs.
-   `UnpackAscii6` reverses the operation and returns the original string. It accepts an optional `signed` boolean (default `true`) for completeness; in the game the `signed` flag is always `true`.

### Random Number Generation

A deterministic PRNG that mirrors the game's behavior.

**Key API:**

-   `new Random(seed?)` — create a generator; if omitted a seed is generated for you and available as `instance.seed`.
-   `rand(random?)` — convenience wrapper. Pass a `Random` instance to use its `nextDouble()`; calling `rand()` with no argument uses the internal global RNG. Prefer passing your own instance for independent or reproducible streams.
-   `Random.resetGlobalRandom(seed?)` — reseed (provide a `seed`) or clear (no args) the internal global RNG.
-   `Random.getGlobalRandomSeed()` — read the currently-set global seed (or `null` if none).

**Why this matters:**

Create a separate `Random` instance for each in-game code line (or logical RNG stream) to reproduce the game's behavior and avoid accidental sequence coupling.

**Example:**

```ts
import { Random, rand } from "@stationeers-ic/exact-ic10-math"

const rngLineA = new Random()
const rngLineB = new Random()

console.log(rand(rngLineA))
console.log(rand(rngLineB))

console.log(rngLineA.seed)
console.log(rngLineB.seed)

// Deterministic runs: pass a seed
// const rngDet = new Random(12345)
```

**Notes:**

-   Tests validate specific integer sequences and floating outputs to ensure reproducible values across platforms.
-   For fully reproducible runs, keep and use your own `Random` instances rather than relying on the global RNG.

#### Replaying Runs / Capturing Seeds

Two approaches for reproducible random sequences:

**1. Global seed approach** — Replay entire run by seeding the global generator:

```ts
import { Random } from "@stationeers-ic/exact-ic10-math"

// choose and record this seed for replay
Random.resetGlobalRandom(111098293)

const a = new Random()
const b = new Random()

console.log(Random.getGlobalRandomSeed() /* -> 111098293 */)
console.log(a.seed, b.seed)

// Later, to replay the same run:
Random.resetGlobalRandom(111098293)
const a2 = new Random()
const b2 = new Random()
// a2.seed === a.seed, b2.seed === b.seed
// rand(a) === rand(a2)
// rand(b) === rand(b2)
```

**2. Instance seed approach** — Capture and replay individual generator:

```ts
const r = new Random()
console.log(r.seed) // store this value

// later
const rReplay = new Random(r.seed)
```

**Use the global-seed approach** when you want to reproduce the full set of generated instance seeds; **use the instance-seed approach** when you only need to replay a single generator.

## Compatibility Note

This library reproduces Stationeers' IC10 instruction semantics exactly — use it when you need faithful in-game behavior; other JS/TS libraries may differ in edge cases.  
Based on Stationeers v0.2.5954.26176 (16.10.2025)
