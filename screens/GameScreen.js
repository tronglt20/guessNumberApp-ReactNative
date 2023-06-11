import { View, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import AppColors from "../constants/AppColors";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomNumber(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

function GameScreen({ pickedNumber, onGameOver }) {
  const initialGuess = generateRandomNumber(1, 100, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess == pickedNumber) {
      onGameOver();
    }
  }, [currentGuess, pickedNumber, onGameOver]);

  // direction => 'lower', 'higher'
  function nextGuessHanlder(direction) {
    if (
      (direction === "lower" && currentGuess < pickedNumber) ||
      (direction === "higher" && currentGuess > pickedNumber)
    ) {
      Alert.alert("You are lie");
      return;
    }
    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    console.log(min, max);
    const newRndNumber = generateRandomNumber(min, max, currentGuess);
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lowner?</Text>
        <View>
          <PrimaryButton pressHandler={nextGuessHanlder.bind(this, "higher")}>
            +
          </PrimaryButton>
          <PrimaryButton pressHandler={nextGuessHanlder.bind(this, "lower")}>
            -
          </PrimaryButton>
        </View>
      </View>
      <View>
        <Text>Round</Text>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.accent500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: AppColors.accent500,
    padding: 12,
  },
});
