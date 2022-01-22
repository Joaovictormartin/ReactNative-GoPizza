import React, { useState } from "react";
import { Platform, Alert } from "react-native";

import happyEmojis from "../../assets/png/happy.png";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  SignOutContainer,
  SignOutIcon
} from "./styles";

export function Home() {
  const { user, SignOut } = useAuth();

  function handleSignOut() {
    SignOut();
  }

  return (
    <Container >
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmojis}/>
          <GreetingText>Olá, {user?.name}</GreetingText>
        </Greeting>

        <SignOutContainer onPress={handleSignOut}>
          <SignOutIcon name="logout"/>
        </SignOutContainer>
      </Header>

      
    </Container>
  );
}
