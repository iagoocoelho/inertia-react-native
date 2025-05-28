import { Container } from "@/components/ui/Container";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
const lockers = [
  { id: "1", address: "Av. Sapopemba, 415 - Vila Reg. Feijó" },
  { id: "2", address: "R. Pantoja, 247 - Vila Reg. Feijó" },
  { id: "3", address: "R. Avai, 358 - Mooca" },
  { id: "4", address: "R. Pascoal Moreira, 450 - Alto da Mooca" },
  { id: "5", address: "R. Padre Adelino, 333 - Belenzinho" },
  { id: "6", address: "R. Martim Burchard, 112 - Brás" },
];

export default function SelectLockerScreen() {
  return (
    <Container>
      <Text style={styles.subtitle}>Selecione um locker:</Text>

      <FlatList
        data={lockers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(lockers)/lockerDetail/${item.id}`)}
          >
            <MaterialIcons
              name="home"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.cardText}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
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
