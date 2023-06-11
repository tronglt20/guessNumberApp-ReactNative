import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Alert } from "react-native";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredValue) {
    setEnteredNumber(enteredValue);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const numberValue = parseInt(enteredNumber);

    if (isNaN(numberValue) || numberValue <= 0 || numberValue > 99) {
      Alert.alert("Invalid number", "Number must be bettwen 0 to 99");
    } else {
      onPickNumber(numberValue);
    }
  }
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttomItem}>
          <PrimaryButton pressHandler={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttomItem}>
          <PrimaryButton pressHandler={confirmInputHandler}>
            Confirm
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 100,
    padding: 16,
    backgroundColor: "#3b0e24",
    borderRadius: "8px",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 4,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  buttomItem: { flex: 1 },
});
