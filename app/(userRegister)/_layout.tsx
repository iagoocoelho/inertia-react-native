import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="userRegister" options={{ title: "Cadastro" }} />
      <Stack.Screen name="successPage" options={{ headerShown: false }} />
    </Stack>
  );
}
