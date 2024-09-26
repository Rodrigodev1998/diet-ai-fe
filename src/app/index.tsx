import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-4xl font-bold color-green-500">DIET</Text>
      <Text className="text-lg font-semibold my-2">Crie sua dieta com inteligencia artificial</Text>
      <Link href="/step" asChild>
        <Pressable className="bg-green-600 w-full h-10 justify-center items-center rounded-lg mt-9">
          <Text className="color-slate-200 font-bold text-xl">Vamos</Text>
        </Pressable>
      </Link>
    </View>
  );
}
