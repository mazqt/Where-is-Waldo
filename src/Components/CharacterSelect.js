import react, { useEffect, useState } from "react";

function CharacterSelect(props) {
  const [choice, setChoice] = useState("");

  useEffect(() => [setChoice(props.characters[0])], [props]);

  return (
    <div className="CharacterSelect">
      {props.characters.map((character, index) => {
        if (index === 0) {
          return (
            <div key={character}>
              <label htmlFor={character}>{character}</label>
              <input
                onClick={setChoice.bind(null, character)}
                type="radio"
                id={character}
                name="character"
                value={character}
                defaultChecked
              />
            </div>
          );
        } else {
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
        }
      })}
      <button type="button" onClick={props.submitChar.bind(null, choice)}>
        Here's Waldo!
      </button>
    </div>
  );
}

export default CharacterSelect;
