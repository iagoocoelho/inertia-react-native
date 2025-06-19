import { Container } from "@/components/ui/Container";
import { getAllLockers } from "@/services/lockers/lockers";
import { Locker } from "@/services/lockers/types";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LockerDetailScreen() {
  const [targetLocker, setTargetLocker] = useState<Locker>();
  const [loadingLockers, setLoadingLockers] = useState(false);
  const { lockerId } = useLocalSearchParams();

  const handleGetLockers = useCallback(async () => {
    try {
      setLoadingLockers(true);
      const allLockers = await getAllLockers();

      const locker = allLockers.find((locker) => locker.id === lockerId);

      if (locker) {
        setTargetLocker(locker);
      } else {
        console.warn("Locker not found");
      }

      setLoadingLockers(false);
    } catch (error) {
      setLoadingLockers(false);
      console.error("Error fetching lockers:", error);
    }
  }, [lockerId]);

  useEffect(() => {
    handleGetLockers();
  }, [handleGetLockers]);

  return (
    <Container>
      <ScrollView>
        <Text style={styles.subtitle}>Detalhes do Locker:</Text>

        {loadingLockers ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : !targetLocker ? (
          <Text style={styles.title}>Locker não encontrado</Text>
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.row}>
                <MaterialIcons
                  name="home"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.cardText}>
                  {targetLocker.facility.address}
                </Text>
              </View>
            </View>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(targetLocker.facility.lat),
                longitude: parseFloat(targetLocker.facility.lon),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(targetLocker.facility.lat),
                  longitude: parseFloat(targetLocker.facility.lon),
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
                <Text style={styles.infoText}>
                  Largura: {targetLocker.width} cm
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="arrow-expand-vertical"
                  size={16}
                  color="#fff"
                />
                <Text style={styles.infoText}>
                  Altura: {targetLocker.height} cm
                </Text>
              </View>

              <View style={styles.infoRow}>
                <FontAwesome5 name="lock" size={16} color="#fff" />
                <Text style={styles.infoText}>Cadeado Smart: Sim</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="verified-user" size={16} color="#fff" />
                <Text style={styles.infoText}>Seguro: Sim</Text>
              </View>

              <Text style={styles.description}>
                Armário 100% Seguro, chaves individuais com desbloqueio via QR
                Code. Para desbloquear basta chegar no local, apontar o QR Code
                no seu celular para o leitor no cadeado e guardar seus pertences
                :)
              </Text>

              <Text style={styles.description}>Seguro 100% incluso.</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Alugar</Text>
            </TouchableOpacity>
          </>
        )}
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
