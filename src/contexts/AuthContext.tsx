import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import Toast from 'react-native-toast-message';

interface User {
  id: string;
  nomeCompleto: string;
  email: string;
  senha?: string;
}

// Definimos o que nosso contexto irá fornecer
interface AuthContextData {
  token: string | null;
  user: User | null;
  isLoading: boolean; // Para sabermos se está carregando o token do storage
  signIn(email: string, senha: string): Promise<void>;
  signUp(nomeCompleto: string, email: string, senha: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para carregar o token salvo quando o app inicia
  useEffect(() => {
    async function loadStorageData() {
      console.log('[AuthContext}] Carregando token do storage...');
      const storedToken = await SecureStore.getItemAsync('token');
      console.log('Token carregado do storage:', storedToken);
      if (storedToken) {
        console.log('[AuthContext] Token encontrado, buscando perfil do usuário...');
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

          const profileResponse = await api.get('/auth/profile');
          const userData: User = profileResponse.data;

          console.log('[AuthContext] Perfil do usuário carregado:', userData);
          await SecureStore.setItemAsync('user', JSON.stringify(userData));
          setToken(storedToken);
          setUser(userData);

        } catch (error) {
          console.log('[AuthContext] Token inválido ou erro ao buscar perfil:', error);
          await signOut();
        }
      } else {
        console.log('[AuthContext] Nenhum token encontrado no storage.');
      }
      setIsLoading(false);
    }
    
    loadStorageData();
  }, []);

  async function signIn(email: string, senha: string) {
    try {
      console.log('Tentando fazer login com:', { email });
      const response = await api.post('/auth/login', { email, senha });
      
      const { access_token } = response.data;

      
      const profileResponse = await api.get('/auth/profile', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      const userData: User = profileResponse.data;
      console.log('Login bem-sucedido. Dados do usuário:', userData.email);

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      await SecureStore.setItemAsync('token', access_token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));

      // 4. Atualizar o estado
      setToken(access_token);
      setUser(userData);

    } catch (error) {
      console.log('[signIn] Erro:', error);
      throw new Error('Falha no login');
    }
  }

  async function signUp(nomeCompleto: string, email: string, senha: string) {
    try {
      console.log('Tentando cadastrar com:', { nomeCompleto, email });
      const response = await api.post('/auth/register', { nomeCompleto, email, senha });
      console.log('Resposta do cadastro', response.data);

      // 2. (Opcional) Fazer o login automaticamente após o cadastro
      await signIn(email, senha);

    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async function signOut() {
    // Limpar o storage e o estado
    console.log('Fazendo sign out');
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    api.defaults.headers.common['Authorization'] = undefined;
    setToken(null);
    setUser(null);

    Toast.show ({
      type: 'info',
      text1: 'Desconectado',
      text2: 'Até mais 👋'
    })
  }

  return (
    <AuthContext.Provider value={{ token, user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o uso
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}