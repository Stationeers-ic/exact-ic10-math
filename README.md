# exact-ic10-math

> # 🟨 Beta
>
> This project is under active development. Not all IC10 functions are implemented yet. A
> 1.0.0 release will include the complete set of math functions. Use the library with caution and
> check individual function docs/tests for availability.
>
> ---
>
> [![install size](https://badgen.net/bundlephobia/minzip/exact-ic10-math) ![install size](https://badgen.net/bundlephobia/tree-shaking/exact-ic10-math) ![install size](https://badgen.net/bundlephobia/dependency-count/exact-ic10-math)](https://bundlephobia.com/package/exact-ic10-math)

A library that faithfully implements IC10 math, bitwise, and logic instructions for Stationeers as TypeScript / JavaScript functions. The core goal is to mimic the game’s IC10 instruction semantics exactly — including operand orders, bit widths, wrapping behavior, and edge-case results — and to provide clear usage instructions so the functions behave like the in-game instructions.

## Compatibility note

This library reproduces Stationeers' IC10 instruction semantics exactly — use it when you need faithful in-game behavior; other JS/TS libraries may differ in edge cases.

## Usage examples

Default export (quickest):

```ts
import ic10 from "exact-ic10-math"

// basic math
console.log(ic10.add(2, 3)) // 5
console.log(ic10.mul(4, 5)) // 20
console.log(ic10.abs(-7)) // 7
console.log(ic10.round(2.5)) // 2

// bitwise / fields
console.log(ic10.and(5, 3)) // 1
console.log(ic10.ins(0, 1, 2, 3)) // 6
```

Named import (ESM / TypeScript):

```ts
import { round, mod, and, ext, ins, add, mul, abs } from "exact-ic10-math"

console.log(round(2.5)) // 2
console.log(mod(-1, 5)) // 4
console.log(and(5, 3)) // 1
console.log(ext(15, 1, 2)) // 3
console.log(ins(0, 1, 2, 3)) // 6
console.log(add(2, 3)) // 5
console.log(mul(4, 5)) // 20
console.log(abs(-7)) // 7
```
