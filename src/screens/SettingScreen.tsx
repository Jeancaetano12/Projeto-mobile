import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { ButtonDefault } from '../components/ButtonDefault'; // Seu componente de botão

export function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-8">
      <Text className="text-2xl font-bold text-gray-800 mb-10">
        Configurações
      </Text>
      <ButtonDefault
        title="Sair (signOut)"
        onPress={signOut}
        className="bg-red-500 w-full"
      />
    </View>
  );
}