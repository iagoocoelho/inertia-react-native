import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function LockerMapScreen() {
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef(null);

  const buscarEndereco = async () => {
    const isCep = /^\d{5}-?\d{3}$/.test(searchText);

    try {
      let lat, lon;

      if (isCep) {
        // Buscar no ViaCEP e depois usar endereço no Nominatim
        const cepRes = await fetch(
          `https://viacep.com.br/ws/${searchText.replace("-", "")}/json/`
        );
        const cepData = await cepRes.json();

        if (cepData.erro) {
          Alert.alert("CEP não encontrado");
          return;
        }

        const enderecoCompleto = `${cepData.logradouro}, ${cepData.localidade}, ${cepData.uf}`;
        const nominatimRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            enderecoCompleto
          )}`
        );
        const geo = await nominatimRes.json();

        if (!geo[0]) {
          Alert.alert("Endereço não encontrado no mapa");
          return;
        }

        lat = parseFloat(geo[0].lat);
        lon = parseFloat(geo[0].lon);
      } else {
        const formattedSearchText = encodeURIComponent(
          searchText.toLowerCase().replaceAll(" ", "+")
        );

        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formattedSearchText}`,
          {
            headers: {
              "User-Agent": "LockerApp/1.0 (https://example.com)",
              "Accept-Language": "pt-BR",
            },
          }
        );

        if (!geoRes.ok) {
          return Alert.alert(
            "Erro ao tentar buscar endereço",
            "Tente novamente mais tarde"
          );
        }

        const geo = await geoRes.json();

        if (!geo[0]) {
          return Alert.alert("Endereço não encontrado");
        }

        lat = parseFloat(geo[0].lat);
        lon = parseFloat(geo[0].lon);
      }

      const novaRegiao = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(novaRegiao);

      mapRef.current?.animateToRegion(novaRegiao, 1000);
    } catch (err) {
      Alert.alert("Erro na busca", err.message);
    }
  };

  const temporarySendToPage = () => {
    return router.push("/(lockers)/lockersList");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {Platform.OS !== "web" && (
            <MapView
              ref={mapRef}
              style={styles.map}
              region={region}
              initialRegion={{
                latitude: -23.55052,
                longitude: -46.633308,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />
            </MapView>
          )}

          <View style={styles.formContainer}>
            <Text style={styles.title}>
              Busque o locker mais perto de você ou de onde deseja!
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Endereço"
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={setSearchText}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={temporarySendToPage}
            >
              <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: width * 0.9,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#8EFF74",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
});
