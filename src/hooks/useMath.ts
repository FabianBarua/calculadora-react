/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { secantMethodProps } from "../utils/types";

const secantMethod = ({ f, x0, x1, tol, maxIter }: secantMethodProps) => {
  let x2;
  const steps = [];

  for (let i = 0; i < maxIter; i++) {
    const f0 = f(x0);
    const f1 = f(x1);

    x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0);

    steps.push({
      iteration: i + 1,
      x0: x0.toFixed(6),
      x1: x1.toFixed(6),
      x2: x2.toFixed(6),
      f0: f0.toFixed(6),
      f1: f1.toFixed(6),
    });

    if (Math.abs(x2 - x1) < tol) {
      return { root: x2, steps };
    }

    x0 = x1;
    x1 = x2;
  }

  throw new Error("El método no convergió");
};

const buscarIntervalos = (
  f: Function,
  rangoMin: number,
  rangoMax: number,
  paso: number
) => {
  const intervalos: { x0: number; x1: number }[] = [];

  for (let x = rangoMin; x < rangoMax; x += paso) {
    const fx = f(x);
    const fxNext = f(x + paso);

    if (fx * fxNext < 0) {
      intervalos.push({ x0: x, x1: x + paso });
    }
  }

  if (intervalos.length === 0) {
    throw new Error("No se encontraron intervalos con cambios de signo.");
  }

  return intervalos;
};

const parseEquation = (equation: string) => {
  let normalizedEquation = equation.replace(/\^/g, "**");
  normalizedEquation = normalizedEquation.replace(
    /(\d+(\.\d+)?)([xX])/g,
    "$1*$3"
  );
  normalizedEquation = normalizedEquation.replace(/π/g, `(${Math.PI})`); // Reemplaza π
  normalizedEquation = normalizedEquation.replace(/\be\b/g, `(${Math.E})`); // Reemplaza e
  normalizedEquation = normalizedEquation.replace(/log\(/g, "Math.log10("); // Reemplaza log para base 10
  normalizedEquation = normalizedEquation.replace(/ln\(/g, "Math.log("); // Reemplaza ln para logaritmo natural

  normalizedEquation = normalizedEquation.replace(/\b(sin|cos)\b/g, "Math.$1"); // Reemplaza sin y cos

  return new Function("x", "return " + normalizedEquation + ";");
};

export const useMath = () => {
  return {
    secantMethod,
    buscarIntervalos,
    parseEquation,
  };
};
