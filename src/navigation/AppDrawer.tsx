import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { AppDrawerParamList } from '../@types/navigation';
// Importe aqui suas outras telas do app (Cadastro de Paciente, etc.)

import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingScreen';
import { Header } from '../components/Header';

const { Navigator, Screen } = createDrawerNavigator<AppDrawerParamList>();

export function AppDrawer() {
  return (
    <Navigator
      screenOptions={{
        header: (props) => <Header {...props} />
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Meu Perfil '}}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
    </Navigator>
  );
}