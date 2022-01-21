import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform, ScrollView } from "react-native";

import { Photo } from "../../components/Photo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { InputPrice } from "../../components/InputPrice";
import { ButtonBack } from "../../components/ButtonBack";

import {
  Container,
  Header,
  Title,
  DeletarContainer,
  DeletarLabel,
  Upload,
  PickerImagemButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from "./styles";

export function Product() {
  const [image, setImage] = useState("");

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        //@ts-ignore
        setImage(result.uri);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>
          <DeletarContainer>
            <DeletarLabel>Deletar</DeletarLabel>
          </DeletarContainer>
        </Header>

      <ScrollView showsVerticalScrollIndicator={false}> 
        <Upload>
          <Photo uri={image} />
          <PickerImagemButton
            type="secondary"
            title="Carregar"
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input multiline maxLength={60} style={{ height: 80 }} />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice size="P" />
            <InputPrice size="M" />
            <InputPrice size="G" />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
          />
        </Form>

      </ScrollView>
    </Container>
  );
}
