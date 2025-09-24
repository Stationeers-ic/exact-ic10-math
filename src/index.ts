export * from "./functions"
export * from "./bitwise"
export * from "./math"
export * from "./tigonometry"
export * from "./comparison"
export { float_epsilon, gameConstants } from "./const"

// Default export containing all functions
import { sll, sla, srl, sra, and, or, xor, nor, not, ext, ins } from "./bitwise"
import { abs, add, sub, mul, div, mod, pow, sqrt, log, exp, min, max, lerp, move } from "./math"
import { sin, cos, tan, acos, asin, atan, atan2 } from "./tigonometry"
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
}
