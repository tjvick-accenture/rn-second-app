import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {props.roundCount}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="New Game" onPress={props.onNewGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
