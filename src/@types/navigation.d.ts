// Importando o tipo que nos ajudará a tipar as telas
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

// Aqui definimos todas as rotas que nosso Stack Navigator terá.
// 'undefined' significa que a rota não espera nenhum parâmetro.
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  // Se tivéssemos uma tela de "Esqueci a Senha", adicionaríamos ela aqui:
  // ForgotPassword: undefined;
};
// Criamos um tipo genérico para as propriedades de tela, para não repetir código.
// Ele usa o nosso mapa de rotas (AuthStackParamList) e o nome da rota atual.
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AppDrawerScreenProps<T extends keyof AppDrawerParamList> =
  DrawerScreenProps<AppDrawerParamList, T>;