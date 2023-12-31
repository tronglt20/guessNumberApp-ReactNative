import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [pickedNumber, setPickedNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandler(numberValue) {
    setPickedNumber(numberValue);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setPickedNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (pickedNumber) {
    screen = (
      <GameScreen pickedNumber={pickedNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && pickedNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        guessNumber={pickedNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
  },
});
