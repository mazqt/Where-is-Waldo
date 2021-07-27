For this project, my aim was to build the classical kids game Where's Waldo as a webapp. For this, I used react and a component structure to break it down into its different parts. A gameboard containing the picture, divs of equal size within it that correspond to coordinates, a selector that lets you make a guess on if a character is in a given square.

It was also my intention  to use firebase functions to manage a timer that checks how long it is between your game start and your game end, as to be able to track highscores and display the top 5. Unfortunately, firebase does not allow functions without a pay-as-you-go account, and while it does provide free of charge below certain amounts, I was simply not comfortable yet to do so. I still am using a highscore system, but it's sadly locally managed. It does however still use the firebase for storage of the start time, hence it's a bit more resistant to tampering.
