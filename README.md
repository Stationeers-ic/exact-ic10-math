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

This repo provides:

-   Implementations of IC10 bitwise/instruction-level operations (e.g. AND, OR, XOR, NOT, SLL/SLA, SRL, SRA, EXT, INS).
-   Helpers for numeric/bit conversions used by those instructions.
-   Usage instructions and examples so the functions can be used in TS/JS projects with predictable, game-accurate behavior.

## Install

```bash
npm i exact-ic10-math
# or
bun add exact-ic10-math
```

## Quick examples / usage instructions

Named imports (recommended for tree-shaking):

```ts
import { sll, not, or, ext, ins } from "exact-ic10-math"

console.log(sll(1, 2)) // 4
console.log(not(10)) // -11        (IC10-style two's complement semantics)
console.log(or(0b1100, 0b0110)) // 14

// extract bits: (value, start, length)
console.log(ext(0b1011, 1, 2)) // 1

// insert bits: (value, insertValue, start, length)
console.log(ins(9223372036854776000, 1, 1, 1)) // wraps like in-game
```

Default import (single object):

```ts
import funcs from "exact-ic10-math"
console.log(funcs.sll(1, 2)) // 4
```

Notes and behavior

-   Function names and argument order mirror IC10 instruction names where practical. This makes the helpers usable as drop-in logic when porting IC10 code to TS/JS.
-   Return type: `number | null`. `null` indicates an invalid input or out-of-range operands (see type definitions in `dist/index.d.ts`).
-   Numeric semantics: implementations target the same 53‑bit payload behavior used by the game (wrapping/truncation, sign behavior, etc.). Large integer literals will wrap similarly to in-game values.
