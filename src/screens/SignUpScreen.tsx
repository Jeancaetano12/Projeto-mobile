import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { InputDefault } from '../components/InputDefault';
import { ButtonDefault } from '../components/ButtonDefault';


// As telas que fazem parte de um navegador recebem uma propriedade 'navigation'
export function SignUpScreen({ navigation }: any) {
  const [nomeCompleto, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signUp } = useAuth();

  async function handleSignUp() {
    try {
      console.log('Botão cadastrar pressionado')
      await signUp(nomeCompleto, email, senha);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao entrar. Verifique suas credenciais.');
      console.log('Erro ao cadastrar:', error);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-8">
      <Image
        source={require('../assets/OharaDiscordLogo.png')}
        className="w-32 h-32 mb-4 rounded-3xl"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Criar Conta
      </Text>
      <Text className="text-base text-gray-600 mb-10">
        Cadastre-se para começar a usar o aplicativo
      </Text>
      <InputDefault
        placeholder="Nome completo"
        onChangeText={setName}
        className="mb-4"
      />
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
        title="Cadastrar"
        onPress={handleSignUp}
        icon={<Ionicons className="ml-2" name="enter" size={26} color="white"/>}
      />

      {/* Botão para voltar para a tela de Login */}
      <TouchableOpacity
        className="mt-8"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-gray-600 font-semibold underline">
          Já tenho uma conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}