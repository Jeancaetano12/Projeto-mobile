import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

import { AuthRoutes } from './AuthRoutes'; // Telas de Login/Cadastro
import { AppDrawer} from './AppDrawer';   // Telas do App (Home, etc.)

export function RootNavigator() {
  const { token, isLoading } = useAuth();

  // Se estivermos carregando o token do storage, mostre um loading
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Se tiver token, mostre o App. Se não, mostre as rotas de Auth.
  return token ? <AppDrawer /> : <AuthRoutes />;
}