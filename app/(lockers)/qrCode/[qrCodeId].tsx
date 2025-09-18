import { Container } from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useLocalSearchParams, useRouter } from "expo-router";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
  const router = useRouter();
  const { qrCodeId, isByBooking }: { qrCodeId: string; isByBooking: "true" } =
    useLocalSearchParams();

  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <View style={styles.qrCode}>
            <QRCode value={qrCodeId} size={180} />
          </View>

          <View style={styles.wrapText}>
            <Text style={styles.title}>
              Mire no leitor do locker o QR code acima
            </Text>
            <Text style={styles.subtitle}>
              Aguarde o escaneamento do QR code para desbloquear seu locker.
            </Text>

            <PrimaryButton
              title={`${!!isByBooking ? "Voltar" : "Ir para Home"} `}
              onPress={() => {
                if (isByBooking === "true") {
                  router.back();
                } else {
                  router.replace("/home");
                }
              }}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    gap: 20,
  },
  qrCode: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapText: {
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    color: "#000",
    fontSize: 22,
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
});
