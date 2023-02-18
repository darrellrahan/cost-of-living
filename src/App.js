import { useState } from "react";

function App() {
  const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(value, iIndex, jIndex) {
    const newBoard = [...board];
    newBoard[iIndex][jIndex] = Number(value);
    setBoard(newBoard);
  }

  async function solvePuzzle() {
    setIsLoading(true);

    const response = await fetch(
      "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "bf7c697f2bmsh5141cf769d29ccap1908b7jsnc06fab634542",
          "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
        },
        body: `{"input":[${[].concat(...board)}]}`,
      }
    );
    const responseJSON = await response.json();
    const answer = responseJSON.answer;

    const newBoard = [];
    while (answer.length) newBoard.push(answer.splice(0, 9));
    setBoard(newBoard);

    setIsLoading(false);
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="app-container">
      <div className="grid">
        {board.map((iElement, iIndex) => {
          return iElement.map((jElement, jIndex) => {
            return (
              <div key={jIndex} className="input-container">
                <input
                  type="text"
                  value={String(jElement)}
                  onChange={(e) => handleChange(e.target.value, iIndex, jIndex)}
                  autoComplete="off"
                />
              </div>
            );
          });
        })}
      </div>
      <button onClick={solvePuzzle}>Solve</button>
      <button onClick={() => setBoard(initialBoard)}>Reset</button>
    </div>
  );
}

export default App;
