export * from "./functions"
export * from "./bitwise"
export * from "./math"
export * from "./trigonometry"
export * from "./comparison"
export * from "./rounding"
export * from "./rand"
export { float_epsilon, type BooleanLikeResult } from "./const"
export { hashString } from "./crc"
export { PackAscii6, UnpackAscii6 } from "./ascii"

// Default export containing all functions
import { sll, sla, srl, sra, and, or, xor, nor, not, ext, ins } from "./bitwise"
import { abs, add, sub, mul, div, mod, pow, sqrt, log, exp, min, max, lerp, move } from "./math"
import { sin, cos, tan, acos, asin, atan, atan2 } from "./trigonometry"
import {
	seq,
	sne,
	slt,
	sle,
	sgt,
	sge,
	seqz,
	snez,
	sltz,
	slez,
	sgtz,
	sgez,
	sap,
	sapz,
	sna,
	snaz,
	snan,
	snanz,
	select,
} from "./comparison"
import { ceil, floor, round, trunc } from "./rounding"
import { rand } from "./rand"

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
	move,
	// trigonometry
	sin,
	cos,
	tan,
	acos,
	asin,
	atan,
	atan2,
	// comparison
	seq,
	sne,
	slt,
	sle,
	sgt,
	sge,
	seqz,
	snez,
	sltz,
	slez,
	sgtz,
	sgez,
	sap,
	sapz,
	sna,
	snaz,
	snan,
	snanz,
	select,
	// rounding
	ceil,
	floor,
	round,
	trunc,
	// random
	rand,
}
