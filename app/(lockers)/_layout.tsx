import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen
        name="lockersList"
        options={{ title: "Selecione um Locker" }}
      />
      <Stack.Screen
        name="searchLocker"
        options={{ title: "Mapa de Lockers" }}
      />
    </Stack>
  );
}
