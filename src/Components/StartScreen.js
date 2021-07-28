// import react, { useState } from "react";
import "./StartScreen.css";

function StartScreen() {
  return (
    <div className="StartScreen">
      <h1>Where's Waldo!</h1>
      <h3>
        Use the dropdown menu to select a picture, and press start to play a
        game of Where's Waldo! You'll be provided with an image in which several
        characters are hiding, and a list of them from which to choose. Once you
        think you've found one, click on the area they're hiding in, select them
        from the list, and click the Here's Waldo! button. If you made the right
        choice, they'll be gone from the list of characters left to find. If you
        manage to find all of them quickly enough, you may even end up on the
        leaderboard!
      </h3>
    </div>
  );
}

export default StartScreen;
