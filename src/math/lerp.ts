export const lerp = (A: number, B: number, t: number): number => {
  return A + (B - A) * t;
};
