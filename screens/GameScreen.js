import React, { useEffect, useState, useRef } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function GameScreen(props) {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  function handleLowerButtonPress() {
    if (currentGuess < userChoice) {
      liarAlert();
      return;
    }

    currentHigh.current = currentGuess - 1;
    setNewRandomGuess();
  }

  function handleGreaterButtonPress() {
    if (currentGuess > userChoice) {
      liarAlert();
      return;
    }

    currentLow.current = currentGuess + 1;
    setNewRandomGuess();
  }

  function setNewRandomGuess() {
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(currentRounds => currentRounds + 1);
  }

  function liarAlert() {
    Alert.alert("J'Accuse!", "We both know you are lying", [
      { text: "Sorry!", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={handleLowerButtonPress} />
        <Button title="GREATER" onPress={handleGreaterButtonPress} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
