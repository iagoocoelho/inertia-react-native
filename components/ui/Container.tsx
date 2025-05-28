import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgb(90, 87, 87)",
  },
  container: {
    flex: 1,
    backgroundColor: "#d7d0c8",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 12 : 0,
  },
});
