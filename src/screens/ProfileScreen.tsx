import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Este Header é o seu componente personalizado
import { Header } from '../components/Header'; 

export function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-gray-100">
      {/* Não precisamos do Header aqui, pois o Drawer Navigator 
        irá fornecê-lo para nós (veja o Passo 6)
      */}
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Meu Perfil
        </Text>
        <Text className="text-lg text-gray-600">
          Nome: {user?.nomeCompleto}
        </Text>
        <Text className="text-lg text-gray-600">
          Email: {user?.email}
        </Text>
      </View>
    </View>
  );
}