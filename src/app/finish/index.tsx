import Header from '@/src/components/header';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDataStore } from '@/src/store/data';
import Select from '@/src/components/input/select';
import { router } from 'expo-router';

const schema = z.object({
  gender: z.string().min(1, { message: "Campo obrigatorio" }),
  level: z.string().min(1, { message: "Campo obrigatorio" }),
  objective: z.string().min(1, { message: "Campo obrigatorio" }),
})
type FormData = z.infer<typeof schema>

const genderOptions = [
  { label: "Masculino", value: "masculino" },
  { label: "Feminino", value: "feminino" },
]

const levelOptions = [
  { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
  { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
  { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
  { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
]

const objectiveOptions = [
  { label: 'Emagrecer', value: 'emagrecer' },
  { label: 'Hipertrofia', value: 'Hipertrofia' },
  { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
  { label: 'Definição', value: 'Definição' },
]

export default function Finish() {

  const { control, handleSubmit, formState: { errors, isValid }} = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageTwo = useDataStore(state => state.setPageTwo)

  function handleCreate(data: FormData){
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective
    })
    router.push("/diet")
  }
 return (
   <View className='flex-1 bg-black'>
        <Header step='Passo 2' />
        <ScrollView className='px-4 mt-10'>
          <Select 
          label="Sexo"
          name="gender"
          control={control}
          placeholder="Selecione uma opção"
          error={errors.gender?.message}
          options={genderOptions}
          />
          <Select 
          label="Selecione o nível de atividade fisíca"
          name="level"
          control={control}
          placeholder="Selecione uma opção"
          error={errors.level?.message}
          options={levelOptions}
          />
          <Select 
          label="Selecione seu objetivo"
          name="objective"
          control={control}
          placeholder="Selecione uma opção"
          error={errors.objective?.message}
          options={objectiveOptions}
          />

          <Pressable 
            className="bg-green-600 w-full h-10 justify-center items-center rounded-lg mt-9"
            onPress={handleSubmit(handleCreate)}
          >
            <Text className="color-slate-200 font-bold text-xl">Gerar dieta</Text>
          </Pressable>
        </ScrollView>
   </View>
  );
}