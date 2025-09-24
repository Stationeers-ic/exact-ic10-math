export function abs(a: number): number {
	return Math.abs(a)
}

export function add(a: number, b: number): number {
	return a + b
}

export function sub(a: number, b: number): number {
	return a - b
}

export function mul(a: number, b: number): number {
	return a * b
}

export function div(a: number, b: number): number {
	return a / b
}
export function mod(a: number, b: number): number {
	const x = a % b
	if (x < 0) return x + b
	return x
}
export function pow(a: number, b: number): number {
	return Math.pow(a, b)
}

export function sqrt(a: number): number {
	return Math.sqrt(a)
}

export function log(a: number): number {
	return Math.log(a)
}

export function exp(a: number): number {
	return Math.exp(a)
}

export function min(a: number, b: number): number {
	return Math.min(a, b)
}

export function max(a: number, b: number): number {
	return Math.max(a, b)
}
export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * min(max(t, 0), 1)
}
