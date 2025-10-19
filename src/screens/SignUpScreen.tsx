import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { InputDefault } from '../components/InputDefault';
import { ButtonDefault } from '../components/ButtonDefault';

// As telas que fazem parte de um navegador recebem uma propriedade 'navigation'
export function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    console.log({ name, email, password });
    // Futuramente, aqui você salvaria o novo usuário no banco de dados
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
        onChangeText={setPassword}
        className="mb-8"
      />

      <ButtonDefault
        title="Cadastrar"
        onPress={handleSignUp}
      />

      {/* Botão para voltar para a tela de Login */}
      <TouchableOpacity
        className="mt-8"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-gray-600 font-semibold">
          Já tenho uma conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}