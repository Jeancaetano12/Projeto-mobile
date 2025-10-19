import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

// Importando nosso mapa de rotas
import { AuthStackParamList } from '../@types/navigation';

// Ao criar o navegador, informamos a ele qual é o nosso mapa de rotas
const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  );
}