import successRentIcon from "@/assets/images/successRent.png";
import { Container } from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function RentSuccess() {
  const router = useRouter();

  const handleAccessLocker = () => {
    router.push({
      pathname: "/qrCode/[qrCodeId]",
      params: { qrCodeId: "STRING" },
    });
  };

  return (
    <Container>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={successRentIcon} />

        <Text style={styles.title}>Sucesso!</Text>
        <Text style={styles.subtitle}>
          O seu locker foi reservado na localização escolhida!
        </Text>
      </View>
      <View style={styles.buttom}>
        <PrimaryButton
          title="Acesse seu Locker!"
          onPress={handleAccessLocker}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
  buttom: {
    marginBottom: 20,
  },
});
