import Accordion from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { getUserId } from "@/services/auth/auth";
import { getAllLockers, postRentLocker } from "@/services/lockers/lockers";
import { Locker } from "@/services/lockers/types";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function LockerDetailScreen() {
  const [targetLocker, setTargetLocker] = useState<Locker>();
  const [loadingLockers, setLoadingLockers] = useState(false);
  const [loadingRentLocker, setLoadingRentLocker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const handleRentLocker = async () => {
    try {
      setLoadingRentLocker(true);

      const userId = await getUserId();

      if (selectedDate && targetLocker && userId) {
        const rentLocker = await postRentLocker({
          lockerId: targetLocker.id,
          userId: userId,
          rentStartDate: new Date().toISOString(),
          rentFinishDate: selectedDate.toISOString(),
        });

        if (rentLocker) {
          return router.push({
            pathname: "/payment/[lockerId]/[rentRequestId]",
            params: {
              rentRequestId: rentLocker.rentRequestId,
              lockerId: targetLocker.id,
              amount: rentLocker.amount,
            },
          });
        }
      }

      setLoadingRentLocker(false);
    } catch (error) {
      setLoadingRentLocker(false);
      console.error("Error fetching lockers:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const now = new Date();

    if (date.getTime() < now.getTime()) {
      Alert.alert("Data inválida", "Escolha uma data/hora futura!");
      hideDatePicker();
      return;
    }

    setSelectedDate(date);
    hideDatePicker();
  };

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
                Data e hora fim da locação:
              </Text>
              <View
                style={[
                  styles.row,
                  { gap: 10, justifyContent: "space-evenly" },
                ]}
              >
                <Text style={styles.cardText}>
                  {selectedDate
                    ? `${selectedDate
                        .toLocaleDateString("pt-BR")
                        .slice(0, 8)} às ${selectedDate.toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`
                    : "Selecione uma DATA FIM da locação"}
                </Text>

                <PrimaryButton
                  onPress={showDatePicker}
                  title="Selecionar data"
                />

                <DateTimePickerModal
                  isDarkModeEnabled
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date()}
                  minuteInterval={30}
                />
              </View>
            </View>

            <View style={styles.card}>
              <Text style={[styles.cardText, styles.infoTitle]}>
                Detalhes do Locker
              </Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="arrow-expand-horizontal"
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.infoText}>
                    Largura: {targetLocker.width} m
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="arrow-expand-vertical"
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.infoText}>
                    Altura: {targetLocker.height} m
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="lock" size={16} color="#fff" />
                  <Text style={styles.infoText}>Cadeado Smart: Sim</Text>
                </View>

                <View style={styles.infoRow}>
                  <MaterialIcons name="verified-user" size={16} color="#fff" />
                  <Text style={styles.infoText}>Seguro: Sim</Text>
                </View>
              </View>

              <Accordion title="Informações importantes">
                <Text style={styles.description}>
                  Armário 100% Seguro, chaves individuais com desbloqueio via QR
                  Code. Para desbloquear basta chegar no local, apontar o QR
                  Code no seu celular para o leitor no cadeado e guardar seus
                  pertences :)
                </Text>

                <Text style={styles.description}>Seguro 100% incluso.</Text>
              </Accordion>
            </View>

            <PrimaryButton
              onPress={handleRentLocker}
              title="Alugar"
              isLoading={loadingRentLocker}
            />
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
  infoContainer: {
    display: "flex",
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
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
    color: "#ffffff",
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
