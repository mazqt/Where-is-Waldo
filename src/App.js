import react, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "./App.css";
import StartScreen from "./Components/StartScreen";
import Gameboard from "./Components/Gameboard";
import Score from "./Components/Score";
import "firebase/analytics";
import "firebase/firestore";

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
  const db = firebase.firestore();

  async function loadOptions() {
    let output = [];
    let querySnapshot = await db.collection("games").get();
    querySnapshot.forEach((doc) => output.push(doc.id));
    return output;
  }

  useEffect(() => {
    let availableGames;
    loadOptions().then((result) => {
      availableGames = result;
      setGames(availableGames);
    });
  }, []);

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
        {games.map((game) => {
          return <li>{game}</li>;
        })}
        <button type="button" onClick={setPlaying.bind(null, true)}>
          Start
        </button>
      </div>
    );
  }
}

export default App;
