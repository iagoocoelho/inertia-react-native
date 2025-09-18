import { Container } from "@/components/ui/Container";
import { useAuth } from "@/context/authContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <Container>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} />
        <Text style={styles.welcome}>Bem vindo</Text>
        <Ionicons name="log-out-outline" size={24} onPress={logout} />
      </View>

      <Text style={styles.appTitle}>InertiaAPP</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, styles.greenCard]}
          onPress={() => router.push("/searchLocker")}
        >
          <FontAwesome5 name="building" size={24} color="#000" />
          <Text style={styles.cardText}>Lockers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/(lockers)/myBookings/myBookingsList",
            })
          }
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.cardTextWhite}>Minhas Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="help-circle" size={24} color="#fff" />
          <Text style={styles.cardTextWhite}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "500",
  },
  appTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#000",
    borderRadius: 12,
    width: "45%",
    height: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  greenCard: {
    backgroundColor: "#A1FF75",
  },
  cardText: {
    marginTop: 8,
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },
  cardTextWhite: {
    marginTop: 8,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
