export const pan = (mat: number[], dx: number, dy: number): number[] => {
  mat[4] += dx;
  mat[5] += dy;

  return mat;
};

export const scale = (mat: number[], s: number): number[] => {

  const m = mat.map(e => e * s);
  return m;
};

export const matrix = (mat: number[]): string => {
  return `matrix(${mat.join(' ')})`;
};
