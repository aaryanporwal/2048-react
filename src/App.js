import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Functions needed
  // Initialize
  const initialize = () => {
    // deep copy data into newGrid variable
    let newGrid = JSON.parse(JSON.stringify(data));
    console.log(newGrid);
    // Spawn 2 numbers on the grid
    spawnNewNumber(newGrid);
    // console.table(newGrid);
    spawnNewNumber(newGrid);
    // console.table(newGrid);
    setData(newGrid);
  };
  // spawnNewNumber() -> Spawns a block of 2 or 4 on the board
  const spawnNewNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
        // Check if no. already exists
      }
    }
  };
  // SwipeBlock() -> Left | Right | Up | Down
  // CheckGameOver()
  // Reset()

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div
      style={{
        background: "#AD9D8F",
        width: "max-content",
        height: "max-content",
        margin: "auto",
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        position: "relative",
      }}
    >
      {data.map((row, oneIndex) => {
        return (
          <div style={{ display: "flex" }} key={oneIndex}>
            {row.map((digit, index) => (
              <Block num={digit} key={index} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

const Block = ({ num }) => {
  const { blockStyle } = style;
  return (
    <div
      style={{
        ...blockStyle,
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num}
    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
};

export default App;
