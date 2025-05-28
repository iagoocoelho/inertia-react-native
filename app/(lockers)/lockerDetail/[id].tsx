import { Container } from "@/components/ui/Container";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LockerDetailScreen() {
  const locker = {
    address: "Av. Sapopemba, 415 - Vila Reg. Feijó, São Paulo - SP, 03345-001",
    latitude: -23.561414,
    longitude: -46.573568,
    largura: "1.00m",
    altura: "1.00m",
    cadeadoSmart: "Sim",
    seguro: "Sim",
    id: 1,
  };

  return (
    <Container>
      <ScrollView>
        <Text style={styles.subtitle}>Detalhes do Locker:</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons
              name="home"
              size={20}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.cardText}>{locker.address}</Text>
          </View>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: locker.latitude,
            longitude: locker.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: locker.latitude,
              longitude: locker.longitude,
            }}
          />
        </MapView>

        <View style={styles.card}>
          <Text style={[styles.cardText, styles.infoTitle]}>
            Informações importantes:
          </Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="arrow-expand-horizontal"
              size={16}
              color="#fff"
            />
            <Text style={styles.infoText}>Largura: {locker.largura}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="arrow-expand-vertical"
              size={16}
              color="#fff"
            />
            <Text style={styles.infoText}>Altura: {locker.altura}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="lock" size={16} color="#fff" />
            <Text style={styles.infoText}>
              Cadeado Smart: {locker.cadeadoSmart}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="verified-user" size={16} color="#fff" />
            <Text style={styles.infoText}>Seguro: {locker.seguro}</Text>
          </View>

          <Text style={styles.description}>
            Armário 100% Seguro, chaves individuais com desbloqueio via QR Code.
            Para desbloquear basta chegar no local, apontar o QR Code no seu
            celular para o leitor no cadeado e guardar seus pertences :)
          </Text>

          <Text style={styles.description}>Seguro 100% incluso.</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Alugar</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    flexShrink: 1,
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#fff",
    marginTop: 10,
    fontSize: 13,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#00FF77",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
