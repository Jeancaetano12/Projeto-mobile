import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import { RootNavigator } from './navigation/index';
import Toast from 'react-native-toast-message';
import { toastConfig } from './config/ToastConfig';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
      {/* Componente de notificação*/}
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}