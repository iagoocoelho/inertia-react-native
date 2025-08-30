import backgroundImage from "@/assets/images/background-login.png";
import UIInput from "@/components/ui/IUInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { postLoginUser } from "@/services/auth/auth";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const result = await postLoginUser({
        email,
        password,
      });

      await SecureStore.setItemAsync("userid", result.userId);

      if (result.userId) {
        return router.replace("/home");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Falha ao logar!", error.data);
    }
  };

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
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            placeholder="Email"
            secureTextEntry={false}
          />
          <UIInput
            value={password}
            onChangeText={setPassword}
            iconName="lock-closed-outline"
            placeholder="Senha"
            secureTextEntry
          />

          <PrimaryButton
            title="Entrar"
            onPress={handleLogin}
            isLoading={isLoading}
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
