import backgroundImage from "@/assets/images/background-login.png";
import UIInput from "@/components/ui/IUInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { postRegisterUser } from "@/services/auth/auth";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function UserRegister() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    try {
      const response = await postRegisterUser({
        name: user.firstName,
        lastName: user.lastName,
        cpf: user.cpf,
        phone: user.phone,
        email: user.email,
        password: user.password,
      });

      if (response) {
        return router.replace("/(userRegister)/successPage");
      }
    } catch (error) {
      // ignore
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#00000065", "#0000007d"]}
            style={{ flex: 1, padding: 20 }}
          >
            <Text style={{ color: "#ffffff", paddingVertical: 15 }}>
              Preencha os campos abaixo:
            </Text>

            <UIInput
              placeholder="Nome"
              secureTextEntry={false}
              iconName="person"
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={40}
              value={user.firstName}
              onChangeText={(text) => setUser({ ...user, firstName: text })}
            />

            <UIInput
              placeholder="Sobrenome"
              secureTextEntry={false}
              iconName="person"
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={60}
              value={user.lastName}
              onChangeText={(text) => setUser({ ...user, lastName: text })}
            />

            <UIInput
              placeholder="CPF"
              secureTextEntry={false}
              iconName="person-sharp"
              keyboardType="numeric"
              maxLength={14}
              autoCapitalize="none"
              autoCorrect={false}
              value={user.cpf}
              onChangeText={(text) => setUser({ ...user, cpf: text })}
            />

            <UIInput
              placeholder="Celular"
              secureTextEntry={false}
              iconName="phone-portrait-outline"
              keyboardType="phone-pad"
              maxLength={15}
              autoCapitalize="none"
              autoCorrect={false}
              value={user.phone}
              onChangeText={(text) => setUser({ ...user, phone: text })}
            />

            <UIInput
              placeholder="Email"
              secureTextEntry={false}
              iconName="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />

            <UIInput
              placeholder="Senha"
              secureTextEntry={true}
              iconName="lock-closed-outline"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
            />

            <UIInput
              placeholder="Confirmar Senha"
              secureTextEntry={true}
              iconName="lock-closed-outline"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              value={user.confirmPassword}
              onChangeText={(text) =>
                setUser({ ...user, confirmPassword: text })
              }
            />

            <PrimaryButton title="Criar conta" onPress={handleRegister} />
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
