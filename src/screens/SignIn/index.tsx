import React, { useState } from "react";
import {
  Platform,
  KeyboardAvoidingView
} from "react-native";

import brandImg from '../../assets/png/brand.png'

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { 
  Container, 
  Content, 
  Brand,
  Title,
  ForgotPasswordButton,
  ForgotPasswordLabel 
} from './styles';

export function SignIn() {
  const { SignIn, isLogging } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    SignIn(email, password)
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <Content>
          <Brand source={brandImg} />
          <Title>Login</Title>

          <Input
            type="secondary"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <Input
            type="secondary"
            placeholder="Senha"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            isLoaded={isLogging}
            onPress={handleSignIn}
          />
        </Content>

      </KeyboardAvoidingView>
    </Container>
  )
}