import Header from '@/src/components/header';
import Input from '@/src/components/input';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { useDataStore } from '@/src/store/data';

const schema = z.object({
  name: z.string().min(1, { message: "Campo obrigatorio" }),
  weight: z.string().min(1, { message: "Campo obrigatorio" }),
  age: z.string().min(1, { message: "Campo obrigatorio" }),
  height: z.string().min(1, { message: "Campo obrigatorio" }),
})
type FormData = z.infer<typeof schema>

export default function Step() {

  const { control, handleSubmit, formState: { errors, isValid }} = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageOne = useDataStore(state => state.setPageOne)

  function handlerform(data: FormData) {
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height,
    })
    router.push("/finish")
  }

 return (
   <View className='flex-1 bg-black'>
        <Header step='Passo 1' />
        <ScrollView className='px-4 mt-10'>
            <Text className='text-xl text-green-600 font-bold'>Preencha as seguintes informações</Text>
            <Input
             name='name'
             label='Nome Completo'
             control={control}
             placeholder='Digite seu nome completo'
             error={errors.name?.message}
             keyboardType='default'
            />
            <Input
             name='height'
             label='Peso atual'
             control={control}
             placeholder='Digite seu peso'
             error={errors.height?.message}
             keyboardType='numeric'
            />
            <Input
             name='weight'
             label='Altura'
             control={control}
             placeholder='Digite sua altura'
             error={errors.weight?.message}
             keyboardType='numeric'
            />
            <Input
             name='age'
             label='Idade'
             control={control}
             placeholder='Digite sua idade'
             error={errors.age?.message}
             keyboardType='numeric'
            />
            <Pressable 
             className="bg-green-600 w-full h-10 justify-center items-center rounded-lg mt-9"
             onPress={handleSubmit(handlerform)}
            >
              <Text className="color-slate-200 font-bold text-xl">Avançar</Text>
            </Pressable>
        </ScrollView>
   </View>
  );
}