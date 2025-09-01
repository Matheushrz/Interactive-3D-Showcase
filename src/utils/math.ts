export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const modulo = (n: number, m: number) => ((n % m) + m) % m
