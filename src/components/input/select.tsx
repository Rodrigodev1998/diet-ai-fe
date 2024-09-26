
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, KeyboardTypeOptions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface OptionsProps{
    label: string,
    value: string | number,
}
interface SelectProps{
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  options: OptionsProps[];
  error?: string;
}
export default function Select({
  name,
  label,
  control,
  placeholder,
  error,
  options,
}: SelectProps) {

    const [visible, setVisible] = useState(false);

 return (
   <View className='my-6'>
      <Text className='color-green-600 mb-4'>{label}</Text>
      <Controller
       control={control}
       name={name}
       render={({ field: { onChange, onBlur, value }}) =>(
        <>
            <TouchableOpacity 
            className='flex-row h-10 items-center justify-between bg-green-800 px-4 rounded-lg'
            onPress={() => setVisible(true)}
            >
                <Text className='text-white'>{value ? options.find(option => option.value === value)?.label : placeholder}</Text>
                <Feather name='arrow-down' size={14} color="#ffff"/>
            </TouchableOpacity>
            <Modal
             visible={visible}
             animationType='fade'
             transparent={true}
             onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity style={styles.modalContainer} onPress={() => setVisible(false)} activeOpacity={1}>
                    <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                        <FlatList
                            contentContainerStyle={{ gap: 4}}
                            data={options}
                            keyExtractor={(item) => item.value.toString() }
                            renderItem={({item}) => (
                                <TouchableOpacity 
                                style={styles.option}
                                onPress={() => {
                                    onChange(item.value)
                                    setVisible(false)
                                }}
                                >
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </>
       )}
       />
       {error && <Text className='color-red-400 mt-1'>{error}</Text>}
   </View>
  );
}

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor: 'rgba(0,0,0, 0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    modalContent:{
        backgroundColor: '#ffff',
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 20
    },
    option:{
        paddingVertical: 14,
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        borderRadius: 4,
        paddingHorizontal: 8,
    }
})