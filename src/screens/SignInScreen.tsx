import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Image, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useAuth } from '../contexts/AuthContext';
import { InputDefault } from '../components/InputDefault';
import { ButtonDefault } from '../components/ButtonDefault';

// Importando nosso tipo de propriedade de tela
import { AuthScreenProps } from '../@types/navigation';

// Substituímos o 'any' pelo tipo correto para a tela 'SignIn'
export function SignInScreen({ navigation }: AuthScreenProps<'SignIn'>) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      console.log('Botão entrar pressionado');
      await signIn(email, senha);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao entrar. Verifique suas credenciais.');
      console.log('Erro ao entrar:', error);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-8">
      {/* O resto do código permanece o mesmo... */}
      <Image
        source={require('../assets/OharaDiscordLogo.png')}
        className="w-32 h-32 mb-4 rounded-3xl"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Bem-vindo(a)!
      </Text>
      <Text className="text-base text-gray-600 mb-10">
        Aplicativo de Saúde Comunitária
      </Text>
      <InputDefault
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        className="mb-4"
      />
      <InputDefault
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        className="mb-8"
      />
      <ButtonDefault
        title="Entrar"
        onPress={handleSignIn}
        icon={<Entypo className="ml-2" name="login" size={24} color="#FFFFFF" />}
      />
      <TouchableOpacity
        className="mt-8"
        onPress={() => navigation.navigate('SignUp')} // Agora o TypeScript sabe que 'SignUp' é uma rota válida!
      >
        <Text className="text-gray-600 font-semibold ">
          Não tem uma conta?{" "}
          <Text className="underline ">
            Clique aqui
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}