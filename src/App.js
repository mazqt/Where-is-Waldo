import react, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "./App.css";
import StartScreen from "./Components/StartScreen";
import Gameboard from "./Components/Gameboard";
import Score from "./Components/Score";
import "firebase/analytics";
import "firebase/firestore";
import CharacterSelect from "./Components/CharacterSelect";

const firebaseConfig = {
  apiKey: "AIzaSyDIZQJvndsGa2X-lEU-G7EtFA3llsyv0-s",
  authDomain: "where-s-waldo-1b941.firebaseapp.com",
  projectId: "where-s-waldo-1b941",
  storageBucket: "where-s-waldo-1b941.appspot.com",
  messagingSenderId: "380101538458",
  appId: "1:380101538458:web:8bbac8988680d42e8e2523",
  measurementId: "G-846PNCVGYC",
};
firebase.initializeApp(firebaseConfig);

function App() {
  const [playing, setPlaying] = useState(false);
  const [games, setGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [chosenGame, setChosenGame] = useState("");
  const [gameData, setGameData] = useState({});
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [currentID, setCurrentID] = useState(0);
  const db = firebase.firestore();

  async function loadOptions() {
    let output = [];
    let querySnapshot = await db.collection("games").get();
    querySnapshot.forEach((doc) => output.push(doc.id));
    return output;
  }

  async function loadGame() {
    let querySnapshot = await db.collection("games").doc(chosenGame).get();
    setGameData(querySnapshot.data());
  }

  function chooseGame(event) {
    setChosenGame(event.target.value);
  }

  useEffect(() => {
    setLoadingGames(true);
    let availableGames;
    loadOptions().then((result) => {
      availableGames = result;
      setGames(availableGames);
      setLoadingGames(false);
      setChosenGame(availableGames[0]);
    });
  }, []);

  useEffect(() => {
    if (playing) {
      loadGame().then(() => {
        setGameLoaded(true);
      });
    }
  }, [playing]);

  if (playing && gameLoaded) {
    return (
      <div>
        <Gameboard
          gameData={gameData}
          setCurrentID={setCurrentID}
          currentID={currentID}
        />
        <div id="gameInfo">
          <Score hits={hits} misses={misses} />
          <button type="button" onClick={setPlaying.bind(null, false)}>
            Stop
          </button>
          <CharacterSelect characters={gameData.characters} />
        </div>
      </div>
    );
  } else {
    if (loadingGames) {
      return (
        <div>
          <StartScreen />
          <h2>Loading Games</h2>
        </div>
      );
    } else {
      return (
        <div>
          <StartScreen />
          <select name="gameSelection" id="gameSelection" onChange={chooseGame}>
            {games.map((game) => {
              return (
                <option value={game} key={game}>
                  {game}
                </option>
              );
            })}
          </select>
          <br></br>
          <button type="button" onClick={setPlaying.bind(null, true)}>
            Start
          </button>
        </div>
      );
    }
  }
}

export default App;
