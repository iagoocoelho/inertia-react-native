import { getAllLockers } from "@/services/lockers/lockers";
import { Locker } from "@/services/lockers/types";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

const HTML_MAP = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Map</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
    </style>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.map('map').setView([-23.55052, -46.633308], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      var markers = [];

      function addMarkers(markerList) {
        markerList.forEach(function(m) {
          var marker = L.marker([m.lat, m.lon]).addTo(map);
          if (m.label) {
            marker.bindTooltip(m.label, {permanent: true, direction: "top", offset: [-15, -20]});
          }

          if (m.id) {
            marker.on('click', function() {
              window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: "markerClick", id: m.id }));
            });
          }
          markers.push(marker);
        });
      }

      document.addEventListener("message", function(event) {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "setMarkers" && Array.isArray(data.markers)) {
            addMarkers(data.markers);
            if (data.markers.length > 0) {
              map.setView([data.markers[0].lat, data.markers[0].lon], 15);
            }
          }
          if (data.type === "centerMap" && data.lat && data.lon) {
            map.setView([data.lat, data.lon], 15);
          }
        } catch (e) {
          // ignore
        }
      });
    </script>
  </body>
  </html>
`;

export default function LockerMapScreen() {
  const geoKey = process.env.EXPO_PUBLIC_GEO_KEY;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingLockers, setLoadingLockers] = useState(true);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const webViewRef = useRef<WebView>(null);

  const handleGetLockers = useCallback(async () => {
    try {
      setLoadingLockers(true);
      const allLockers = await getAllLockers();

      setLockers(allLockers);

      setLoadingLockers(false);
    } catch (error) {
      setLoadingLockers(false);
      console.error("Error fetching lockers:", error);
    }
  }, []);

  useEffect(() => {
    handleGetLockers();
  }, [handleGetLockers]);

  const sendMarkersToWebView = (markers: { lat: number; lon: number }[]) => {
    if (!webViewRef.current) {
      console.warn("WebView reference is not set 2");
      return;
    }

    webViewRef.current?.postMessage(
      JSON.stringify({ type: "setMarkers", markers })
    );
  };

  const sendUserLocationToWebView = (lat: number, lon: number) => {
    if (!webViewRef.current) {
      console.warn("WebView reference is not set");
      return;
    }

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "centerMap",
        lat,
        lon,
      })
    );
  };

  const fetchSuggestions = useCallback(
    async (text: string) => {
      if (text.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${geoKey}&q=${encodeURIComponent(
            text
          )}&limit=5&normalizeaddress=1&countrycodes=br`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }

      setLoading(false);
    },
    [geoKey]
  );

  const debouncedSearch = useMemo(
    () => debounce(fetchSuggestions, 400),
    [fetchSuggestions]
  );

  const handleChangeText = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const handleSelect = (item: Suggestion) => {
    setQuery(item.display_name);
    setSuggestions([]);

    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    sendUserLocationToWebView(lat, lon);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Encontre um locker perto de onde você deseja."
              value={query}
              onChangeText={handleChangeText}
              style={styles.input}
            />
            {loading && <ActivityIndicator size="small" color="#000" />}
          </View>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelect(item)}
              >
                <Text>{item.display_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {!loadingLockers && (
          <WebView
            ref={webViewRef}
            originWhitelist={["*"]}
            source={{ html: HTML_MAP }}
            style={styles.map}
            onLoadEnd={() => {
              sendMarkersToWebView(
                lockers.map((marker) => {
                  return {
                    lat: parseFloat(marker.facility.lat),
                    lon: parseFloat(marker.facility.lon),
                    id: marker.facility.id,
                    label: marker.facility.address,
                  };
                })
              );
            }}
            onMessage={(event) => {
              try {
                const data = JSON.parse(event.nativeEvent.data);
                if (data.type === "markerClick" && data.id) {
                  router.push({
                    pathname: "/(lockers)/lockerList/[facilityId]",
                    params: { facilityId: data.id },
                  });
                }
              } catch {
                console.warn(
                  "Error parsing message from WebView:",
                  event.nativeEvent.data
                );
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchSection: { padding: 16, backgroundColor: "#fff", zIndex: 2 },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  map: { flex: 1, minHeight: 300 },
});
