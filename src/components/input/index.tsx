
import { Controller } from 'react-hook-form';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

interface InputProps{
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  rules?:object;
  error?: string;
  keyboardType: KeyboardTypeOptions;
}
export default function Input({
  name,
  label,
  control,
  placeholder,
  rules,
  error,
  keyboardType,
}: InputProps) {
 return (
   <View className='my-6'>
      <Text className='color-green-600 mb-4'>{label}</Text>
      <Controller
       control={control}
       name={name}
       rules={rules}
       render={({ field: { onChange, onBlur, value }}) =>(
          <TextInput
          className='h-11 rounded-lg border-solid border-2 border-lime-800 px-2 text-lime-700'
          placeholder={placeholder}
          onBlur={onBlur}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          />
       )}
       />
       {error && <Text className='color-red-400 mt-1'>{error}</Text>}
   </View>
  );
}