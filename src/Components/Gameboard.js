import react, { useState } from "react";
import Square from "./Square";

function Gameboard() {
  return (
    <div className="Gameboard">
      <h1>I'm the Gameboard</h1>
      <Square />
    </div>
  );
}

export default Gameboard;
