import React, { useState } from "react";
import {
  Platform,
  KeyboardAvoidingView
} from "react-native";

import brandImg from '../../assets/png/brand.png'

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
  const [isLoaded, setIsLoaded] = useState(false);

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
          />

          <Input
            type="secondary"
            placeholder="Senha"
            secureTextEntry
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            isLoaded={isLoaded}
          />
        </Content>

      </KeyboardAvoidingView>
    </Container>
  )
}