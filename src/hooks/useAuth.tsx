import React, {
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext
} from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  isLogging: boolean;
  SignIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);

  async function SignIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail ou a senha');
    }

    setIsLogging(true);

    auth().signInWithEmailAndPassword(email, password)
      .then((account) => { console.log(account) })
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


  return (
    <AuthContext.Provider value={{ isLogging, SignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context
}

export { AuthProvider, useAuth }


