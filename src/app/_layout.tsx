import { Stack } from "expo-router";
import "@/src/styles/global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <Stack>
        <Stack.Screen 
        name="index"
        options={{
          headerShown: false
        }} />
        <Stack.Screen 
        name="step/index"
        options={{
          headerShown: false
        }} />
        <Stack.Screen 
          name="diet/index"
          options={{
            headerShown: false
          }} />
        <Stack.Screen 
        name="finish/index"
        options={{
          headerShown: false
        }} />
          
      </Stack>
    </QueryClientProvider>
  );
}
