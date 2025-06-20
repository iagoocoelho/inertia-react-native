import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface UIInputProps extends TextInputProps {
  iconName?: IoniconsName;
  placeholder: string;
  secureTextEntry: boolean;
}

export default function UIInput({
  iconName,
  placeholder,
  secureTextEntry,
  ...rest
}: UIInputProps) {
  return (
    <View style={styles.inputContainer}>
      {iconName && (
        <Ionicons name={iconName} size={20} color="#ccc" style={styles.icon} />
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#ccc"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 45,
    color: "#fff",
  },
});
