/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export interface stepsProps {
  iteration: number;
  x0: string;
  x1: string;
  x2: string;
  f0: string;
  f1: string;
}

export interface setExamplesAndCalculateProps {
  equation: string;
  x0: number;
  x1: number;
  tol: number;
  maxIter: number;
}

export interface secantMethodProps {
  f: Function;
  x0: number;
  x1: number;
  tol: number;
  maxIter: number;
}

export interface handleCalculateProps {
  equation: string;
  x0: number;
  x1: number;
  tol: number;
  maxIter: number;
}
