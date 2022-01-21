import React, {
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext
} from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  isLogging: boolean;
  user: User | null;
  SignIn: (email: string, password: string) => Promise<void>;
  ForgotPassword: (email: string) => Promise<void>;
  SignOut: () => Promise<void>;
}

const USER_COLLECTION = '@gopizza:users';

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  async function loadUserStorageDate() {
    setIsLogging(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLogging(false)
  }

  async function SignIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail ou a senha');
    }

    setIsLogging(true);

    auth().signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              }
              await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
              setUser(userData);
            }
          })
          .catch(() => {
            Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário');
          })
      })
      .catch((error) => {
        const { code } = error;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          Alert.alert('Login', 'E-mail e/ou senha inválido.')
        } else {
          Alert.alert('Login', 'Não foi possível realizar o loggin.')
        }
      })
      .finally(() => setIsLogging(false))
  }

  async function SignOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  
  async function ForgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Login', 'Informe o e-mail');
    }

    auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert('Redefinir senha', 'Enviamos um link para o seu e-mail cadastrado'))
      .catch(() => Alert.alert('Redefinir senha', 'Não foi possível enviar o e-mail'))
  }


  useEffect(() => {
    loadUserStorageDate();
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLogging, 
      SignIn, 
      SignOut,
      ForgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context
}

export { AuthProvider, useAuth }


