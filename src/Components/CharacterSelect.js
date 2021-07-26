import react, { useState } from "react";

function CharacterSelect(props) {
  const [choice, setChoice] = useState("none");

  return (
    <div className="CharacterSelect">
      <label htmlFor="none">Nobody's here</label>
      <input
        type="radio"
        id="none"
        name="character"
        value="none"
        onClick={setChoice.bind(null, "none")}
      />
      {props.characters.map((character) => {
        return (
          <div key={character}>
            <label htmlFor={character}>{character}</label>
            <input
              onClick={setChoice.bind(null, character)}
              type="radio"
              id={character}
              name="character"
              value={character}
            />
          </div>
        );
      })}
      <button type="button" onClick={props.submitChar.bind(null, choice)}>
        Here's Waldo!
      </button>
    </div>
  );
}

export default CharacterSelect;
