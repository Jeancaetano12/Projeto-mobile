import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

// Definimos o tipo de dados do usuário (ajuste conforme seu back-end)
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
      const storedToken = await SecureStore.getItemAsync('token');
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedToken && storedUser) {
        // Se tem um token, o axios para usá-lo em todas as requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, senha: string) {
    try {
      console.log('Tentando fazer login com:', { email, senha });
      const response = await api.post('/auth/login', { email, senha });
      console.log('Resposta do login:', response.data);
      const { access_token } = response.data;

      
      const profileResponse = await api.get('/auth/profile', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      const userData: User = profileResponse.data;

      
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      await SecureStore.setItemAsync('token', access_token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));

      // 4. Atualizar o estado
      setToken(access_token);
      setUser(userData);

    } catch (error) {
      console.error(error);
      throw new error;
    }
  }

  async function signUp(nomeCompleto: string, email: string, senha: string) {
    try {
      console.log('Tentando cadastrar com:', { nomeCompleto, email, senha });
      const response = await api.post('/auth/register', { nomeCompleto, email, senha });
      console.log('Resposta do cadastro', response.data);

      // 2. (Opcional) Fazer o login automaticamente após o cadastro
      await signIn(email, senha);

    } catch (error) {
      console.error(error);
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