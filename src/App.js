import { useState } from "react";

function App() {
  const [coordinates, setCoordinates] = useState({
    currentCoordinates: [],
    poppedCoordinates: [],
  });

  function handleClick(e) {
    const newCurrentCoordinates = [...coordinates.currentCoordinates];
    newCurrentCoordinates.push({ x: e.clientX, y: e.clientY });

    setCoordinates({
      ...coordinates,
      currentCoordinates: newCurrentCoordinates,
    });
  }

  function handleCoordinate(type) {
    const newCurrentCoordinates = [...coordinates.currentCoordinates];
    const newPoppedCoordinates = [...coordinates.poppedCoordinates];

    const poppedCoordinate =
      type === "undo"
        ? newCurrentCoordinates.pop()
        : newPoppedCoordinates.pop();

    type === "undo"
      ? newPoppedCoordinates.push(poppedCoordinate)
      : newCurrentCoordinates.push(poppedCoordinate);

    if (!poppedCoordinate) return;

    setCoordinates({
      currentCoordinates: newCurrentCoordinates,
      poppedCoordinates: newPoppedCoordinates,
    });
  }

  return (
    <div className="app-container">
      <div className="top">
        <div className="buttons">
          <button
            disabled={coordinates.currentCoordinates.length === 0 && true}
            style={{
              opacity: coordinates.currentCoordinates.length === 0 && "0.5",
              cursor:
                coordinates.currentCoordinates.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={() => handleCoordinate("undo")}
          >
            Undo
          </button>
          <button
            disabled={coordinates.poppedCoordinates.length === 0 && true}
            style={{
              opacity: coordinates.poppedCoordinates.length === 0 && "0.5",
              cursor:
                coordinates.poppedCoordinates.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={() => handleCoordinate("redo")}
          >
            Redo
          </button>
        </div>
        <h3>Click anywhere on below's board to see the magic!</h3>
        <div />
      </div>
      <div className="click-area" onClick={handleClick}>
        {coordinates.currentCoordinates.map((coordinate, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${coordinate.y - 72}px`,
              left: `${coordinate.x - 20}px`,
              width: "10px",
              height: "10px",
              backgroundColor: "#eee",
              borderRadius: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
