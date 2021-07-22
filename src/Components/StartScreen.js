import react, { useState } from "react";
import CharacterSelect from "./CharacterSelect";

function StartScreen() {
  return (
    <div className="StartScreen">
      <h1>I'm the StartScreen</h1>
      <CharacterSelect />
    </div>
  );
}

export default StartScreen;
