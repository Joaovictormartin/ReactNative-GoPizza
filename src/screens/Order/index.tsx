import React, { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useAuth } from "../../hooks/useAuth";
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
  };
};

export function Order() {
  const { navigate, goBack } = useNavigation();
  const { user } = useAuth();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const [size, setSizes] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tabNumber, setTabNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sendingOrder, setSendingOrder] = useState(false);

  const amount = size ? pizza.prices_sizes[size] * quantity : "R$ 0,00";

  function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamnho da pizza");
    }
    if (!tabNumber) {
      return Alert.alert("Pedido", "Informe o número da mesa");
    }
    if (!quantity) {
      return Alert.alert("Pedido", "Informe a quantidade.");
    }

    setSendingOrder(true);

    firestore()
      .collection("orders")
      .add({
        quantity,
        amount,
        size,
        table_number: tabNumber,
        status: "Preparando",
        waiter_id: user?.id,
        pizza: pizza.name,
        image: pizza.photo_url,
      })
      .then(() => navigate("home"))
      .catch(() => Alert.alert("Pedido", "Não foi possível realizar o pedido"))
      .finally(() => setSendingOrder(false));
  }

  useEffect(() => {
    firestore()
      .collection("pizzas")
      .doc(id)
      .get()
      .then((resp) => setPizza(resp.data() as PizzaResponse))
      .catch(() =>
        Alert.alert("Pedido", "Não foi possível carregar o producto")
      )
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScrool>
        <Header>
          <ButtonBack onPress={() => goBack()} style={{ marginBottom: 108 }} />
        </Header>

        {isLoading ? (
          <Load />
        ) : (
          <>
            <Photo source={{ uri: pizza?.photo_url }} />

            <Form>
              <Title>{pizza?.name}</Title>
              <Label>Selecione um tamanho</Label>

              <Sizes>
                {PIZZAS_TYPES.map((item) => (
                  <RadioButton
                    key={item.id}
                    title={item.name}
                    selected={size === item.id}
                    onPress={() => setSizes(item.id)}
                  />
                ))}
              </Sizes>

              <FormRow>
                <InputGroup>
                  <Label>Número da mesa</Label>
                  <Input keyboardType="numeric" onChangeText={setTabNumber} />
                </InputGroup>

                <InputGroup>
                  <Label>Quantidade</Label>
                  <Input
                    keyboardType="numeric"
                    onChangeText={(value) => setQuantity(Number(value))}
                  />
                </InputGroup>
              </FormRow>

              <Price>{amount}</Price>

              <Button
                title="Confirmar pedido"
                isLoaded={sendingOrder}
                onPress={handleOrder}
              />
            </Form>
          </>
        )}
      </ContentScrool>
    </Container>
  );
}
