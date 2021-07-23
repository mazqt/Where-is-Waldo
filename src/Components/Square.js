import react, { useState } from "react";
import CharacterSelect from "./CharacterSelect";
import "./Square.css";

function Square(props) {
  return (
    <div
      className={props.class}
      pos={props.pos}
      onClick={props.setCurrentID.bind(null, props.pos)}
    >
      {/* <CharacterSelect /> */}
    </div>
  );
}

export default Square;
