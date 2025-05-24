import { StyleSheet, View } from "react-native";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d0c8",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});
