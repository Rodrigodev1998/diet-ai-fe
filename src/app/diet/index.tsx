import { View, Text, Pressable, ScrollView, Share } from 'react-native';

import { useDataStore } from '../../store/data'

import { useQuery } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'
import { Data } from '@/src/types/data';
import { api } from '@/src/services/api';

interface ResponseData {
    data: Data
  }

export default function Diet() {

  const user = useDataStore(state => state.user)

  const { data, isFetching, error } = useQuery({
    queryKey: ["diet"],
    queryFn: async () => {
      try{
        if(!user){
          throw new Error("Filed load diet")
        }

        
        const response = await api.post<ResponseData>("/information", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height:  user.height,
          weight: user.weight,
          objective: user.objective,
          level: user.level
        })

        return response.data.data


      }catch(err){
        console.log(err);
      }
    }
  })


  async function handleShare(){
    try{
      if(data && Object.keys(data).length === 0) return;

      const supplements = `${data?.suplementos.map( item => ` ${item}`)}`

      const foods = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map( alimento => ` ${alimento}` )}`)}`

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`

      await Share.share({
        message: message
      })


        }catch(err){
        console.log(err);
        }
    }
    if(isFetching){
        return(
          <View className='flex-1 bg-black justify-center items-center'>
            <Text className='text-xl text-white m-2 justify-center items-center'>Estamos gerando sua dieta</Text>
          </View>
        )
      }
    
      if(error){
        return(
          <View className='flex-1 bg-black justify-center items-center'>
            <Text className='text-xl text-white m-2 justify-center items-center'>Falha ao gerar dieta</Text>
            <Link href="/">
              <Text className='text-xl text-green-700 m-2 justify-center items-center'>Tente novamente</Text>
            </Link>
          </View>
        )
      }
    return (
        <View className='bg-black flex-1'>
        <View className='bg-white justify-between rounded-b-lg pt-16 pb-5 mb-4'>
          <View className='flex-col items-center justify-center px-4'>
            <Text className='text-lg color-black font-bold'>Sua dieta</Text>
    
            <Pressable className='bg-blue-500 items-center justify-center p-2 rounded-lg my-2' onPress={handleShare}>
              <Text className='color-white font-medium'>Compartilhar</Text>
              <Ionicons name="share-social" size={16} color="#ffff" />
            </Pressable>
          </View>
        </View>
    
        <View style={{ paddingLeft: 16, paddingRight: 16, flex:1 }}>
          {data && Object.keys(data).length > 0 && (
            <>
              <Text className='text-base color-white font-bold'>Nome: {data.nome}</Text>
              <Text className='text-base color-white font-bold'>Foco: {data.objetivo}</Text>
    
              <Text className='text-base color-white font-bold'>Refeições:</Text>
              <ScrollView>
                <View className='bg-white p-4 rounded-lg mt-3 gap-4'>
                  {data.refeicoes.map( (refeicao) => (
                    <View key={refeicao.nome} className='bg-[rgba(208, 208, 208, 0.40)] p-2 rounded-md'>
                      <View className='flex-row items-center justify-between mb-2'>
                        <Text className='text-lg font-bold'>{refeicao.nome}</Text>
                        <Ionicons name="restaurant" size={16} color="#000" />
                      </View>
    
                      <View className='flex-row items-center gap-4'>
                        <Feather name="clock" size={14} color="#000"/>
                        <Text>Horário: {refeicao.horario}</Text>
                      </View>
    
                      <Text className='text-lg mb-4 mt-2'>Alimentos:</Text>
                      {refeicao.alimentos.map(alimento => (
                        <Text key={alimento}>{alimento}</Text>
                      ))}
    
                    </View>
                  ))}
                </View>
    
                <View className='bg-white my-4 p-4 rounded-lg'>
                  <Text className='text-lg mb-4 mt-2 font-bold'>Dica suplementos:</Text>
                  {data.suplementos.map( item => (
                    <Text key={item}>{item}</Text>
                  ))}
                </View>
    
                <Pressable className="bg-green-600 w-full h-10 justify-center items-center rounded-lg mt-2" onPress={ () => router.replace("/") }>
                  <Text className="color-slate-200 font-bold text-xl">
                    Gerar nova dieta
                  </Text>
                </Pressable>
              </ScrollView>
    
            </>
          )}
        </View>
    
      </View>
    )
    }