import { Container } from "@/components/ui/Container";
import { useAuth } from "@/context/authContext";
import { getMyBookingsByUserId } from "@/services/lockers/lockers";
import { RentLockerResponse } from "@/services/lockers/types";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MyBookingsList() {
  const { userInfo } = useAuth();

  const [myBookings, setMyBookings] = useState<RentLockerResponse[]>([]);
  const [loadingLockers, setLoadingLockers] = useState(false);

  const handleMyBookingsList = useCallback(async () => {
    try {
      setLoadingLockers(true);
      const myBookings = await getMyBookingsByUserId(userInfo.userId);

      setMyBookings(myBookings);

      setLoadingLockers(false);
    } catch (error) {
      setLoadingLockers(false);
    }
  }, [userInfo.userId]);

  useEffect(() => {
    handleMyBookingsList();
  }, [handleMyBookingsList]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return {
      date: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <Container>
      <Text style={styles.subtitle}>Reservas feitas:</Text>

      {loadingLockers ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : myBookings.length === 0 ? (
        <Text style={styles.title}>
          Não há locações realizadas, que tal começar?! :)
        </Text>
      ) : (
        <FlatList
          data={myBookings}
          style={{ width: "100%", display: "flex" }}
          keyExtractor={(item, index) => item.rentRequestId + "_" + index}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(lockers)/qrCode/[qrCodeId]",
                  params: { qrCodeId: item.openingKey, isByBooking: "true" },
                })
              }
            >
              <MaterialIcons
                name="home"
                size={24}
                color="#fff"
                style={styles.icon}
              />

              <View style={styles.containerText}>
                <Text style={[styles.cardText, { fontSize: 11, flex: 1 }]}>
                  {item.locker.alias} - {item.locker.facility.address}
                </Text>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={[styles.cardText, { fontWeight: "bold" }]}>
                    {formatDate(item.rentFinishDate).date}
                  </Text>
                  <Text style={[styles.cardText, { fontWeight: "bold" }]}>
                    {formatDate(item.rentFinishDate).time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 12,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  cardSmall: {
    color: "#fff",
    fontSize: 10,
  },
});
