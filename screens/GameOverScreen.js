import { View, Image, StyleSheet, Text } from "react-native";
import Title from "../components/ui/Title";
import AppColors from "../constants/AppColors";
import PrimaryButton from "../components/ui/PrimaryButton";
function GameOverScreen({ roundsNumber, guessNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.textSummary}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{guessNumber}</Text>
      </Text>
      <PrimaryButton pressHandler={onStartNewGame}>
        Start New Game
      </PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: AppColors.primary600,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textSummary: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: AppColors.primary500,
  },
});
