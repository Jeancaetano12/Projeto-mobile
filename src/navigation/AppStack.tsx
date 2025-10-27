import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
// Importe aqui suas outras telas do app (Cadastro de Paciente, etc.)

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeScreen} />
      {/* <Screen name="CadastroPaciente" component={CadastroPacienteScreen} /> */}
    </Navigator>
  );
}