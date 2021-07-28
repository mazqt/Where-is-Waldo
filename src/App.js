import react, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "./App.css";
import StartScreen from "./Components/StartScreen";
import Gameboard from "./Components/Gameboard";
import Score from "./Components/Score";
import "firebase/analytics";
import "firebase/firestore";
import CharacterSelect from "./Components/CharacterSelect";
import uuid from "uuid";

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
  const [characters, setCharacters] = useState(0);
  const [won, setWon] = useState(false);
  const [id, setID] = useState("");
  const [time, setTime] = useState();
  const [scores, setScores] = useState([]);
  const [scoreNames, setScoreNames] = useState([]);
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
    setCharacters(querySnapshot.data().characters);
  }

  function chooseGame(event) {
    setChosenGame(event.target.value);
  }

  useEffect(() => {
    if (characters.length === 0) {
      setWon(true);
      const end = Date.now();
      db.collection("times")
        .doc(id)
        .get()
        .then((querySnapshot) => {
          const start = querySnapshot.data().time;
          setTime((end - start) / 1000);
        });
    }
  }, [characters]);

  useEffect(() => {
    if (time != null) {
      db.collection("games")
        .doc(chosenGame)
        .get()
        .then((querySnapshot) => {
          let highscores = querySnapshot.data().highscores;
          const name = window.prompt(
            "Enter your name so that we can save your score!",
            "Waldo"
          );
          highscores.push({ [time]: name });
          highscores.sort((a, b) => {
            return Object.keys(a)[0] - Object.keys(b)[0];
          });
          highscores = highscores.slice(0, 10);
          db.collection("games")
            .doc(chosenGame)
            .update({ highscores: highscores });
          let names = [];
          let scores = [];
          highscores.forEach((score) => {
            names.push(Object.values(score)[0]);
            scores.push(Object.keys(score)[0]);
          });
          setScores(scores);
          setScoreNames(names);
        });
    }
  }, [time]);

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
        const start = Date.now();
        const val = uuid.v4();
        setID(val);
        db.collection("times").doc(val).set({ time: start });
      });
    }
  }, [playing]);

  function submitChar(choice) {
    if (gameData.positions[choice] == currentID) {
      setHits(hits + 1);
      setCharacters(characters.filter((char) => char !== choice));
    } else {
      setMisses(misses + 1);
    }
  }

  if (playing && gameLoaded) {
    if (!won) {
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
            <CharacterSelect characters={characters} submitChar={submitChar} />
          </div>
        </div>
      );
    } else {
      if (time != null) {
        return (
          <div>
            <div>You've won!! You did it it {time} seconds</div>
            <ol>
              {scoreNames.map((name, index) => {
                return (
                  <li>
                    {name}: {scores[index]} seconds
                  </li>
                );
              })}
            </ol>
          </div>
        );
      } else {
        return <div>You've won!! You did it it {time} seconds</div>;
      }
    }
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
