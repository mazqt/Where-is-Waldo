import react, { useState } from "react";

function Score(props) {
  return (
    <div className="Score">
      <h2>Hits: {props.hits}</h2>
      <h2>Misses: {props.misses}</h2>
    </div>
  );
}

export default Score;
