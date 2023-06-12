import { Text, StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";

function InstructionText({ children }) {
  return <Text style={styles.instructionText}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: AppColors.accent500,
    fontSize: 24,
  },
});
