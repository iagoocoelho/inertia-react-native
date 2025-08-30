import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
};

const PrimaryButton = ({ title, onPress, isLoading }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9EFF8B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
