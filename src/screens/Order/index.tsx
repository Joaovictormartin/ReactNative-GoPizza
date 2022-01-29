import React, { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from "@react-navigation/native";

import { PIZZAS_TYPES } from "../../utils/pizzaTypes";

import { Load } from "../../components/Load";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { RadioButton } from "../../components/RadioButton";
import { ProductProps } from "../../components/ProductCard";

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

type OrderNavigationProps = {
  id: string;
};

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  }
};

export function Order() {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const [size, setSizes] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tabNumber, setTabNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const amount = size ? pizza.prices_sizes[size] * quantity : '0,00';

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

  useEffect(() => {
    firestore()
      .collection('pizzas')
      .doc(id)
      .get()
      .then(resp => setPizza(resp.data() as PizzaResponse))
      .catch(() => Alert.alert('Pedido', 'Não foi possível carregar o producto'))
      .finally(() => setIsLoading(false))
  },[id])

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScrool>
        <Header>
          <ButtonBack onPress={() => goBack()} style={{ marginBottom: 108 }} />
        </Header>

        {isLoading ? <Load/> : (
          <>
            <Photo source={{ uri: pizza?.photo_url }} />

            <Form>
              <Title>{pizza?.name}</Title>
              <Label>Selecione um tamanho</Label>

              <Sizes>{SizesRadio()}</Sizes>

              <FormRow>
                <InputGroup>
                  <Label>Número da mesa</Label>
                  <Input 
                  keyboardType="numeric" 
                  onChangeText={setTabNumber}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Quantidade</Label>
                  <Input 
                  keyboardType="numeric" 
                  onChangeText={(value) => setQuantity(Number(value))}
                  />
                </InputGroup>
              </FormRow>

              <Price>R$ {amount}</Price>

              <Button title="Confirmar pedido" />
            </Form>
          </>
        )}
      </ContentScrool>
    </Container>
  );
}
