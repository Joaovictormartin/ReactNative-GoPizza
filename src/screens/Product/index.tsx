import React, { useState } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";;

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
  const [image, setImage] = useState('');

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [ 4, 4 ]
      });

      if(!result.cancelled) {
        //@ts-ignore
        setImage(result.uri)
      }
    }
  }

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
        <Photo uri={image}/>
        <PickerImagemButton 
          type="secondary" 
          title="Carregar" 
          onPress={handlePickerImage}
        />
      </Upload>

    </Container>
  )
}