import { Container } from "@/components/ui/Container";
import { getLockersyFacilityId } from "@/services/lockers/lockers";
import { Locker } from "@/services/lockers/types";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function LockerList() {
  const [lockersByFacilityId, setLockersByFacilityId] = useState<Locker[]>([]);
  const [loadingLockers, setLoadingLockers] = useState(false);
  const { facilityId } = useLocalSearchParams();

  const handleAllLockersByFacilityId = useCallback(async () => {
    try {
      setLoadingLockers(true);
      const lockers = await getLockersyFacilityId(facilityId as string);

      setLockersByFacilityId(lockers);

      setLoadingLockers(false);
    } catch (error) {
      setLoadingLockers(false);
      console.error("Error fetching lockers:", error);
    }
  }, [facilityId]);

  useEffect(() => {
    handleAllLockersByFacilityId();
  }, [handleAllLockersByFacilityId]);

  return (
    <Container>
      <Text style={styles.subtitle}>Selecione um locker:</Text>

      {loadingLockers ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : lockersByFacilityId.length === 0 ? (
        <Text style={styles.title}>Nenhum locker encontrado</Text>
      ) : (
        <FlatList
          data={lockersByFacilityId}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/lockerDetail/[lockerId]",
                  params: { lockerId: item.id },
                })
              }
            >
              <MaterialIcons
                name="home"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.cardText}>{item.id}</Text>
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
