import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  function handleStartGame(selectedNumber) {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  function handleGameOver(nRounds) {
    setGuessRounds(nRounds);
  }

  function handleNewGame() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let content = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber) {
    content = (
      <GameScreen 
        userChoice={userNumber} 
        onGameOver={handleGameOver} 
      />
    );
  }

  if (guessRounds > 0) {
    content = (
      <GameOverScreen 
        roundCount={guessRounds}
        userNumber={userNumber}
        onNewGame={handleNewGame}
      />
    )
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
