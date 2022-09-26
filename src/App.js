import { useState, useEffect } from "react";
import { cloneDeep, isEqual } from "lodash";
import { getBgColors, useEvent } from "./util";

function App() {
  // Keycodes for movements
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

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
    let newGrid = cloneDeep(data);
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
    while (!added) {
      if (gridFull) {
        break;
      }
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);

      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
        // Check if no. already exists
      }
    }
  };

  // SwipeBlock() -> Left | Right | Up | Down
  const swipeLeft = (dummy) => {
    console.log("swipe left");
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let board = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (board[slow] === 0 && board[fast] === 0) {
          fast++;
        } else if (board[slow] === 0 && board[fast] !== 0) {
          board[slow] = board[fast];
          board[fast] = 0;
          fast++;
        } else if (board[slow] !== 0 && board[fast] === 0) {
          fast++;
        } else if (board[slow] !== 0 && board[fast] !== 0) {
          if (board[slow] === board[fast]) {
            board[slow] = board[slow] + board[fast];
            board[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (!isEqual(oldGrid, newArray)) {
      spawnNewNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (dummy) => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let board = newArray[i];
      let slow = board.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (board[slow] === 0 && board[fast] === 0) {
          fast--;
        } else if (board[slow] === 0 && board[fast] !== 0) {
          board[slow] = board[fast];
          board[fast] = 0;
          fast--;
        } else if (board[slow] !== 0 && board[fast] === 0) {
          fast--;
        } else if (board[slow] !== 0 && board[fast] !== 0) {
          if (board[slow] === board[fast]) {
            board[slow] = board[slow] + board[fast];
            board[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (!isEqual(newArray, oldData)) {
      spawnNewNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeDown = (dummy) => {
    console.log("swipe down");
    console.log(data);
    let board = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = board.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (board[slow][i] === 0 && board[fast][i] === 0) {
          fast--;
        } else if (board[slow][i] === 0 && board[fast][i] !== 0) {
          board[slow][i] = board[fast][i];
          board[fast][i] = 0;
          fast--;
        } else if (board[slow][i] !== 0 && board[fast][i] === 0) {
          fast--;
        } else if (board[slow][i] !== 0 && board[fast][i] !== 0) {
          if (board[slow][i] === board[fast][i]) {
            board[slow][i] = board[slow][i] + board[fast][i];
            board[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (!isEqual(board, oldData)) {
      spawnNewNumber(board);
    }
    if (dummy) {
      return board;
    } else {
      setData(board);
    }
  };

  const swipeUp = (dummy) => {
    console.log("swipe up");
    let board = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (board[slow][i] === 0 && board[fast][i] === 0) {
          fast++;
        } else if (board[slow][i] === 0 && board[fast][i] !== 0) {
          board[slow][i] = board[fast][i];
          board[fast][i] = 0;
          fast++;
        } else if (board[slow][i] !== 0 && board[fast][i] === 0) {
          fast++;
        } else if (board[slow][i] !== 0 && board[fast][i] !== 0) {
          if (board[slow][i] === board[fast][i]) {
            board[slow][i] = board[slow][i] + board[fast][i];
            board[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (!isEqual(board, oldData)) {
      spawnNewNumber(board);
    }
    if (dummy) {
      return board;
    } else {
      setData(board);
    }
  };

  // Handle Key Down
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      default:
        break;
    }
  };

  // CheckGameOver()
  // Reset()

  useEffect(() => {
    initialize();
    // document.addEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEvent("keydown", handleKeyDown);

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
        background: getBgColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num !== 0 ? num : ""}
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
