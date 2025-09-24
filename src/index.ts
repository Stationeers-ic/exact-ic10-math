import { sll, sla, srl, sra, and, or, xor, nor, not, ext, ins } from "./bitwise"
import { abs, add, sub, mul, div, mod, pow, sqrt, log, exp, min, max, lerp } from "./math"
import { sin, cos, tan, acos, asin, atan, atan2 } from "./tigonometry"

export default {
	// bitwise
	sll,
	sla,
	srl,
	sra,
	and,
	or,
	xor,
	nor,
	not,
	ext,
	ins,
	// math
	abs,
	add,
	sub,
	mul,
	div,
	mod,
	pow,
	sqrt,
	log,
	exp,
	min,
	max,
	lerp,
	// trigonometry
	sin,
	cos,
	tan,
	acos,
	asin,
	atan,
	atan2,
}

export * from "./functions"
export * from "./bitwise"
export * from "./math"
export * from "./tigonometry"
