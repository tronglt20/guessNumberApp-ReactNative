import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";
import { Ionicons } from "@expo/vector-icons";
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
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess == pickedNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, pickedNumber, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

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
    const newRndNumber = generateRandomNumber(min, max, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds((_) => [newRndNumber, ..._]);
  }
  const guessRoundListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText>Higher or lowner?</InstructionText>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            style={styles.buttomItem}
            pressHandler={nextGuessHanlder.bind(this, "lower")}
          >
            <Ionicons name="md-remove" />
          </PrimaryButton>
          <PrimaryButton
            style={styles.buttomItem}
            pressHandler={nextGuessHanlder.bind(this, "higher")}
          >
            <Ionicons name="md-add" />
          </PrimaryButton>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((item) => {
          <Text key={item}>{item}</Text>;
        })} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
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
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  buttomItem: { flex: 1 },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
