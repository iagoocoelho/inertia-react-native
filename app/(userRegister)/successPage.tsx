import backgroundImage from "@/assets/images/background-login.png";
import checkIcon from "@/assets/images/successIcon.png";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountCreatedScreen() {
  const router = useRouter();

  const handleAccessNow = () => {
    router.replace("/");
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["#00000088", "#000000aa"]}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.iconCircle}>
            <Image source={checkIcon} />
          </View>

          <Text style={styles.title}>Conta criada com sucesso!</Text>
          <Text style={styles.subtitle}>
            Não perca tempo, acesso agora nosso aplicativo!
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleAccessNow}>
            <Text style={styles.buttonText}>Acessar agora!</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
  container: {
    alignItems: "center",
  },
  iconCircle: {
    backgroundColor: "#A1FF75",
    borderRadius: 100,
    marginBottom: 30,
  },
  checkIcon: {
    width: 40,
    height: 40,
    tintColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#A1FF75",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
