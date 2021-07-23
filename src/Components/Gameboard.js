import react, { useState } from "react";
import Square from "./Square";
import "./Gameboard.css";

function Gameboard(props) {
  function createBoard() {
    let board = [];
    for (let i = 0; i < 50; i++) {
      if (i != props.currentID) {
        board.push(
          <Square
            key={i}
            pos={i}
            class="Square"
            setCurrentID={props.setCurrentID}
          />
        );
      } else {
        board.push(
          <Square
            key={i}
            pos={i}
            class="Square Selected"
            setCurrentID={props.setCurrentID}
          />
        );
      }
    }
    return board;
  }

  return (
    <div
      className="Gameboard"
      style={{ backgroundImage: `url("${props.gameData.url}")` }}
    >
      {createBoard()}
    </div>
  );
}

export default Gameboard;
