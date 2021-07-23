import react, { useState } from "react";

function CharacterSelect(props) {
  return (
    <div className="CharacterSelect">
      {props.characters.map((character) => {
        return (
          <div key={character}>
            <label htmlFor={character}>{character}</label>
            <input
              type="radio"
              id={character}
              name="character"
              value={character}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CharacterSelect;
