import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(lockers)/lockersList"
        options={{ title: "Selecione um Locker" }}
      />
      <Stack.Screen
        name="(lockers)/searchLocker"
        options={{ title: "Mapa de Lockers" }}
      />
    </Stack>
  );
}
