/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Delete } from "lucide-react";
import { useState } from "react";

const specialButtons = [
  {
    key: "x",
    label: "x",
  },
  {
    key: "π",
    label: "π",
  },
  {
    key: "e",
    label: "e",
  },
  {
    key: "(",
    label: "(",
  },
  {
    key: ")",
    label: ")",
  },
  {
    key: "+",
    label: "+",
  },
  {
    key: "-",
    label: "-",
  },
  {
    key: "*",
    label: "×",
  },
  {
    key: "/",
    label: "÷",
  },
  {
    key: "^",
    label: "xⁿ",
  },
  {
    key: ".",
    label: ".",
  },
];

function App() {
  const [equation, setEquation] = useState("");
  const [x0, setX0] = useState(0);
  const [x1, setX1] = useState(0);
  const [tol, setTol] = useState(0);
  const [maxIter, setMaxIter] = useState(0);
  const [result, setResult] = useState("");

  const secantMethod = (
    f: Function,
    x0: number,
    x1: number,
    tol: number,
    maxIter: number
  ) => {
    let x2;
    for (let i = 0; i < maxIter; i++) {
      const f0 = f(x0);
      const f1 = f(x1);

      x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0);

      if (Math.abs(x2 - x1) < tol) {
        return x2;
      }

      x0 = x1;
      x1 = x2;
    }
    throw new Error("El método no convergió");
  };

  const parseEquation = (equation: string) => {
    const normalizedEquation = equation.replace(/\^/g, "**");
    return new Function("x", "return " + normalizedEquation + ";");
  };

  const handleCalculate = () => {
    try {
      const f = parseEquation(equation);
      const root = secantMethod(f, x0, x1, tol, maxIter);
      setResult(`${root.toFixed(6)}`);
    } catch (error) {
      if (error instanceof Error) {
        setResult(error.message);
      } else {
        setResult("An unknown error occurred");
      }
    }
  };

  const handleClear = () => {
    // get element by id
    const input = document.getElementById("x0") as HTMLInputElement;
    input.value = "";

    const input2 = document.getElementById("x1") as HTMLInputElement;
    input2.value = "";

    const input3 = document.getElementById("tol") as HTMLInputElement;
    input3.value = "";

    const input4 = document.getElementById("maxIter") as HTMLInputElement;
    input4.value = "";

    setEquation("");
    setResult("");
  };

  const addToEquation = (value: string) => {
    setEquation((prevEquation) => prevEquation + value);
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    // Aquí puedes agregar lógica para validar los símbolos permitidos, si es necesario.
    setEquation(inputValue);
  };

  const handleBackspace = () => {
    setEquation((prevEquation) => prevEquation.slice(0, -1));
  };

  const setExamplesAndCalculate = ({
    equation,
    x0,
    x1,
    tol,
    maxIter,
  }: {
    equation: string;
    x0: number;
    x1: number;
    tol: number;
    maxIter: number;
  }) => {
    const init = async () => {
      setEquation(equation);
      setX0(x0);
      setX1(x1);
      setTol(tol);
      setMaxIter(maxIter);

      // get element by id
      const input = document.getElementById("x0") as HTMLInputElement;
      input.value = x0.toString();

      const input2 = document.getElementById("x1") as HTMLInputElement;
      input2.value = x1.toString();

      const input3 = document.getElementById("tol") as HTMLInputElement;
      input3.value = tol.toString();

      const input4 = document.getElementById("maxIter") as HTMLInputElement;
      input4.value = maxIter.toString();

      await new Promise((resolve) => setTimeout(resolve, 500));
      handleCalculate();
    };

    init();
  };

  return (
    <>
      <div className=" relative bg-gray-950 h-dvh w-dvw flex  flex-col gap-4 justify-center items-center ">
        <div className=" p-3 bg-gray-900 max-w-sm w-full flex  flex-col gap-2 rounded-3xl text-gray-400">
          <p className=" text-center">Algunos Ejemplos para probar la app</p>

          <div className=" flex justify-center items-center gap-2">
            <button
              onClick={() =>
                setExamplesAndCalculate({
                  equation: "x^3 - 2*x - 5",
                  x0: 2,
                  x1: 3,
                  tol: 0.0001,
                  maxIter: 100,
                })
              }
              className="bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              x^3 - 2*x - 5
            </button>

            <button
              onClick={() =>
                setExamplesAndCalculate({
                  equation: "x^3 - 2",
                  x0: 1,
                  x1: 2,
                  tol: 0.0001,
                  maxIter: 100,
                })
              }
              className="bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              x^3 - 2
            </button>

            <button
              onClick={() =>
                setExamplesAndCalculate({
                  equation: "x^2 - 4",
                  x0: 1,
                  x1: 2,
                  tol: 0.0001,
                  maxIter: 100,
                })
              }
              className="bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              x^2 - 4
            </button>
          </div>
        </div>

        <div className=" max-w-sm w-full   bg-gray-900 p-6 rounded-3xl">
          <div className=" w-full flex items-center p-3 h-12 rounded-xl  text-gray-200/50  font-mono bg-gray-800">
            Resultado:{" "}
            <span className=" ml-2 text-white">
              {" "}
              {result || "Aun no se ha calculado"}{" "}
            </span>
          </div>

          <hr className=" my-4 border-gray-700" />

          {/* Campo de texto para ingresar la ecuación */}
          <div className=" flex gap-2   h-12 ">
            <input
              type="text"
              value={equation}
              onChange={handleInputChange}
              className=" w-full bg-gray-800 p-3 rounded-xl text-gray-200  font-mono"
              placeholder="Ingresa tu ecuación aquí"
            />

            <button
              onClick={handleBackspace}
              className=" bg-gray-800  hover:bg-yellow-900 transition-colors active:bg-yellow-600 size-12 shrink-0 rounded-xl text-white flex justify-center items-center "
            >
              <Delete />
            </button>
          </div>

          {/* Botones especiales */}

          <div className=" flex gap-1 mt-4 w-full flex-wrap justify-center">
            {specialButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => addToEquation(button.key)}
                className=" bg-gray-700 hover:bg-yellow-900 transition-colors active:bg-yellow-600 size-10 shrink-0 rounded-xl text-white flex justify-center items-center"
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className=" flex justify-between  gap-2 mt-4">
            <div className=" flex flex-col  gap-2">
              <div className=" flex justify-between">
                <label
                  htmlFor="x0"
                  className=" outline-none bg-gray-800/50  py-2 pl-3  pr-7 rounded-xl -mr-5  font-medium  text-gray-500 inline-block "
                >
                  X0:
                </label>
                <input
                  id="x0"
                  defaultValue={x0}
                  onChange={(e) => {
                    if (
                      e.target.value.match(/^[0-9.-]+$/) ||
                      e.target.value === ""
                    ) {
                      setX0(parseFloat(e.target.value));
                    } else {
                      e.target.value = x0.toString();
                    }
                  }}
                  className=" w-full p-2 text-center max-w-16 bg-gray-800 rounded-xl text-gray-200"
                />
              </div>

              <div className=" flex justify-between">
                <label
                  htmlFor="x1"
                  className=" outline-none bg-gray-800/50  py-2 pl-3  pr-7 rounded-xl -mr-5  font-medium  text-gray-500 inline-block "
                >
                  X1:
                </label>
                <input
                  id="x1"
                  defaultValue={x1}
                  onChange={(e) => {
                    if (
                      e.target.value.match(/^[0-9.-]+$/) ||
                      e.target.value === ""
                    ) {
                      setX0(parseFloat(e.target.value));
                    } else {
                      e.target.value = x0.toString();
                    }
                  }}
                  className=" w-full p-2 text-center max-w-16 bg-gray-800 rounded-xl text-gray-200"
                />
              </div>
            </div>

            <div className=" gap-2 flex flex-col  flex-1 ">
              <div className=" w-full flex  gap-2">
                <label
                  htmlFor="tol"
                  className=" w-full outline-none bg-gray-800/50  py-2 pl-3  pr-7 rounded-xl -mr-7  font-medium  text-gray-500 inline-block "
                >
                  Tolerancia:
                </label>
                <input
                  type="number"
                  id="tol"
                  value={tol}
                  onChange={(e) => setTol(parseFloat(e.target.value))}
                  className="  p-2 text-center  w-32 bg-gray-800 rounded-xl text-gray-200"
                />
              </div>

              <div className=" flex   justify-between w-full">
                <label
                  htmlFor="maxIter"
                  className=" outline-none bg-gray-800/50  py-2 pl-3  pr-10 rounded-xl -mr-5  font-medium  text-gray-500 inline-block  text-nowrap"
                >
                  Máx Int.:
                </label>
                <input
                  type="number"
                  id="maxIter"
                  value={maxIter}
                  onChange={(e) => setMaxIter(parseInt(e.target.value))}
                  className=" w-32 p-2 text-center  bg-gray-800 rounded-xl text-gray-200"
                />
              </div>
            </div>
          </div>

          <div className=" flex gap-4 mt-4">
            <button
              onClick={handleCalculate}
              className=" w-full bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              Calcular Raíz
            </button>

            <button
              onClick={handleClear}
              className=" w-full bg-red-950/50 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>


        <div className=" p-5 bg-gray-900 max-w-sm w-full flex  flex-col gap-2 rounded-3xl text-gray-400">
        <h3 className=''>
              Programa creado por los alumnos:
            </h3>
            <ul className=" flex gap-1 flex-wrap justify-center text-sm">
              {
                [
                  'Fabian Barua',
                  'Andrea Aguayo',
                  'Adriel Duarte',
                ].map(
                  (name, i) => (
                    <li key={i} className="text-white bg-gray-800 px-3 rounded-xl py-1 text-nowrap">
                      {name}
                    </li>
                  )
                )
              }
            </ul>
            
        </div>
        
      </div>
    </>
  );
}

export default App;
