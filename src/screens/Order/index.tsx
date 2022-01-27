import React, { useState } from "react";
import { Platform } from "react-native";
//import { useNavigation } from "@react-navigation/native";

import { PIZZAS_TYPES } from "../../utils/pizzaTypes";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { RadioButton } from "../../components/RadioButton";

import {
  Container,
  ContentScrool,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
} from "./styles";

export function Order() {
  //const { navigate, goBack } = useNavigation();

  const [size, setSizes] = useState("");

  function SizesRadio() {
    return PIZZAS_TYPES.map((item) => (
      <RadioButton
        key={item.id}
        title={item.name}
        selected={size === item.id}
        onPress={() => setSizes(item.id)}
      />
    ));
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScrool>
        <Header>
          <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
        </Header>

        <Photo source={{ uri: "https://github.com/joaovictormartin.png" }} />

        <Form>
          <Title>Nome da Pizza</Title>
          <Label>Selecione um tamanho</Label>

          <Sizes>{SizesRadio()}</Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>R$ 10,00</Price>

          <Button title="Confirmar pedido" />
        </Form>
      </ContentScrool>
    </Container>
  );
}
