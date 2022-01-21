import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform, ScrollView, Alert } from "react-native";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleAdd() {
    if (!name) {
      return Alert.alert("Cadastro", "Informe o nome da pizza");
    }
    if (!description) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza");
    }
    if (!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza");
    }
    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert("Cadastro", "Informe o preço de todos os tamanhos da pizza");
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
            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              multiline
              maxLength={60}
              value={description}
              style={{ height: 80 }}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size="P"
              value={priceSizeP}
              onChangeText={setPriceSizeP}
            />

            <InputPrice
              size="M"
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />

            <InputPrice
              size="G"
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoaded={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
