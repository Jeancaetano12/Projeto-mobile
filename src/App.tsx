// Novo código com NativeWind
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      
      <Text className="text-red-700 text-2xl font-bold">Meu App com NativeWind!</Text>
      
      <StatusBar style="light" />
    </View>
  );
}