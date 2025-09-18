import { Container } from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAuth } from "@/context/authContext";
import { getAllLockers } from "@/services/lockers/lockers";
import { Locker } from "@/services/lockers/types";
import { postPaymentRent } from "@/services/payment/payment";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LockerDetailScreen() {
  const [targetLocker, setTargetLocker] = useState<Locker>();
  const [loadingLockers, setLoadingLockers] = useState(false);
  const [loadingRentLocker, setLoadingRentLocker] = useState(false);
  const { lockerId, rentRequestId, amount } = useLocalSearchParams();
  const { userInfo } = useAuth();

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

  const handlePaymentLocker = async () => {
    try {
      setLoadingRentLocker(true);

      if (targetLocker && userInfo.userId) {
        const payment = await postPaymentRent({
          rentRequestId: rentRequestId as string,
          userId: userInfo.userId,
          amount: Number(amount),
          type: "CREDITO",
          validated: true,
        });

        if (payment) {
          return router.push({
            pathname: "/rentSuccess",
            params: {
              rentRequestId: payment.rentRequestId,
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

  return (
    <Container>
      <ScrollView>
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

            <View
              style={{
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 42,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                R${" "}
                {Number(amount).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </Text>

              <PrimaryButton
                onPress={handlePaymentLocker}
                title="Pagar"
                isLoading={loadingRentLocker}
              />
            </View>
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
