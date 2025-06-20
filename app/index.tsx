import backgroundImage from "@/assets/images/background-login.png";
import UIInput from "@/components/ui/IUInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>InertiaAPP</Text>

        <LinearGradient colors={["#000000aa", "#000000cc"]} style={styles.card}>
          <Text style={styles.loginText}>Faça seu login...</Text>

          <UIInput
            iconName="mail-outline"
            placeholder="Email"
            secureTextEntry={false}
          />
          <UIInput
            iconName="lock-closed-outline"
            placeholder="Senha"
            secureTextEntry
          />

          <PrimaryButton
            title="Entrar"
            onPress={() => router.replace("/home")}
          />

          <Text style={styles.footerText}>
            Não possui uma conta?{" "}
            <Text
              style={styles.link}
              onPress={() => router.replace("/userRegister")}
            >
              Criar conta
            </Text>
          </Text>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#9EFF8B",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#000000aa",
    padding: 20,
    borderRadius: 25,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
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
  footerText: {
    textAlign: "center",
    color: "#ccc",
  },
  link: {
    textDecorationLine: "underline",
    color: "#fff",
  },
});
