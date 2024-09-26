import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

interface HeaderProps{
    step: string
}

export default function Header({step}: HeaderProps) {
 return (
   <SafeAreaView className='mb-2'>
        <View className='px-4'>
            <View className='flex-row items-center gap-3'>
                <Pressable onPress={() => router.back()}>
                    <Feather name='arrow-left' size={32} color="#166534"/>
                </Pressable>
                <Text className='color-green-600'>{step}</Text>
            </View>
        </View>
   </SafeAreaView>
  );
}