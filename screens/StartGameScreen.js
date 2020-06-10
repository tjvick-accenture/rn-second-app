import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";

function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [gameNumber, setGameNumber] = useState();

  function handleNumberChangeText(inputText) {
    setEnteredValue(inputText.replace(/[^\d]/g, ""));
  }

  function handleResetButtonPress() {
    setEnteredValue("");
    setIsConfirmed(false);
  }

  function handleConfirmButtonPress() {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!', 
        'Number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'desctructive', onPress: handleResetButtonPress}])
      return;
    }

    setIsConfirmed(true);
    setGameNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  }

  function handleStartGameButtonPress() {
    props.onStartGame(gameNumber);
  }

  let confirmedOutput;
  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{gameNumber}</NumberContainer>
        <Button title="START GAME" onPress={handleStartGameButtonPress}/>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Enter a Number:</Text>
          <Input
            style={styles.numberInput}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={handleNumberChangeText}
          />
          <View style={styles.buttonPairContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={colors.secondary}
                onPress={handleResetButtonPress}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color={colors.primary}
                onPress={handleConfirmButtonPress}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 20,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonPairContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  numberInput: {
    width: 50,
    textAlign: "center",
    fontSize: 20,
    height: 40,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
});

export default StartGameScreen;
