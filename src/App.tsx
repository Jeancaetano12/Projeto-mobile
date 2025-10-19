import { StatusBar } from 'expo-status-bar';
// 1. Precisamos importar o NavigationContainer
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './navigation/AppRoutes';

export default function App() {
  return (
    // 2. Envolvemos todo o nosso sistema de rotas com o NavigationContainer
    <NavigationContainer>
      <AppRoutes />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}