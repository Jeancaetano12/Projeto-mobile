import React from 'react';
import { View, Text } from 'react-native';
import { ButtonDefault } from '../components/ButtonDefault';
import { useAuth } from '../contexts/AuthContext';

export function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Tela Principal
      </Text>
      <Text className="text-lg text-gray-600 mb-10">
        Bem-vindo(a), {user?.nomeCompleto}!
      </Text>
      
    </View>
  );
}