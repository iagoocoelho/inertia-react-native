import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="lockerList/[facilityId]"
        options={{ title: "Lockers disponíveis" }}
      />

      <Stack.Screen
        name="lockerDetail/[lockerId]"
        options={{ title: "Detalhes do Locker" }}
      />

      <Stack.Screen
        name="searchLocker"
        options={{ title: "Mapa de Lockers" }}
      />

      <Stack.Screen name="rentSuccess" options={{ headerShown: false }} />

      <Stack.Screen
        name="payment/[lockerId]/[rentRequestId]"
        options={{ title: "Pagamento do Locker" }}
      />

      <Stack.Screen name="qrCode/[qrCodeId]" options={{ headerShown: false }} />
    </Stack>
  );
}
