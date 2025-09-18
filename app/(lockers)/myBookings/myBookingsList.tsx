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
      console.error("Error fetching lockers:", error);
    }
  }, [userInfo.userId]);

  useEffect(() => {
    handleMyBookingsList();
  }, [handleMyBookingsList]);

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
          keyExtractor={(item) => item.lockerId}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/lockerDetail/[lockerId]",
                  params: { lockerId: item.lockerId },
                })
              }
            >
              <MaterialIcons
                name="home"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.cardText}>{item.amount}</Text>
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
    fontSize: 14,
  },
});
