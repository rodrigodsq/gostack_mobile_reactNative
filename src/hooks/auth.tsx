import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: unknown; // era p ser object :/
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: unknown;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>; // definindo uma função passando a tipagem de SignInCredentials e com uma promise de retorno;
  signOut(): void;
}

// api de contexto, do tipo AuthContextData, e definindo os parametros tbm como AuthContextData;
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState | null>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      // verificando se existe alguma coisa dentro de "token e user" e alocando os valores na state "data";
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data?.user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // verificando se já existe contexto (se ja passamos o AuthContext no app.tsx); se esta em um contexto do AuthProvider;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// AuthContext  :   arquivo principal de instancia do createContext, é utilizado como tag (leia abaixo);
// <AuthContext.Provider> :  dentro da tag <AuthContext.Provider> são passadas os valores que serão exportados de forma global no useContext ;
// sigIn  : função que é passada na tag <AuthContext.Provider>, para autenticação(login);
// sigIn  : função para deslogar o usuario autenticado, que limpa os dados de auteticação no localstorage e no state data;
// [data, setData]  :   estado que armazenar os dados do usuario autenticado, ao iniciar ele ja verifica se existe algum usuario autenticado no localstorage;
// AuthProvider : component do createContext que vai ser exportado p app.tsx, nele tbm fica todos os dados(variaveis e funções) que serão exportados p outros arquivos;
// useAuth()  :   criando hook de autenticação;
// loading  : hook que indica quando a verificação de auth ja foi completada para poder sair do carregamento inicial; utilizada na src/routes/index.tsx;
