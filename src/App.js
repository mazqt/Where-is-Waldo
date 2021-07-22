import react, { useState } from "react";
import "./App.css";
import StartScreen from "./Components/StartScreen";
import Gameboard from "./Components/Gameboard";
import Score from "./Components/Score";

function App() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div>
        <Gameboard />
        <Score />
        <button type="button" onClick={setPlaying.bind(null, false)}>
          Stop
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <StartScreen />
        <button type="button" onClick={setPlaying.bind(null, true)}>
          Start
        </button>
      </div>
    );
  }
}

export default App;
