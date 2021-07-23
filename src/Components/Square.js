import react, { useState } from "react";
import CharacterSelect from "./CharacterSelect";

function Square() {
  return (
    <div className="Square">
      <h1>I'm the Square</h1>
      <CharacterSelect />
    </div>
  );
}

export default Square;
