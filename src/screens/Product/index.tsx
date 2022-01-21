import React, { useState } from "react";
import { Platform } from "react-native";

import { Photo } from "../../components/Photo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";

import { 
  Container, 
  Header, 
  Title,
  DeletarContainer,
  DeletarLabel,
  Upload,
  PickerImagemButton
} from './styles';

export function Product() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack/>
        <Title>Cadastrar</Title>
        <DeletarContainer>
          <DeletarLabel>Deletar</DeletarLabel>
        </DeletarContainer>
      </Header>

      <Upload>
        <Photo uri=""/>
        <PickerImagemButton 
          type="secondary" 
          title="Carregar" 
          onPress={() =>{}}
        />
      </Upload>

    </Container>
  )
}