import React, { useState } from "react";
import { Platform } from "react-native";

import { 
  Container, 
  Header, 
  Title,
  DeletarContainer,
  DeletarLabel,

} from './styles';

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <Title>Cadastrar</Title>
        <DeletarContainer>
          <DeletarLabel>Deletar</DeletarLabel>
        </DeletarContainer>
      </Header>
    </Container>
  )
}