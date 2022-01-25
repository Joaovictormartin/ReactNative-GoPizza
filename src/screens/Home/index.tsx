import React, { useState, useEffect } from "react";
import { Platform, Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import happyEmojis from "../../assets/png/happy.png";

import { useAuth } from "../../hooks/useAuth";
import { Search } from "../../components/Search";
import { Button } from "../../components/Button";
import { ProductCard, ProductProps } from "../../components/ProductCard";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  SignOutContainer,
  SignOutIcon,
  MenuHeader,
  MenuTitle,
  MenuItemsNumber,
} from "./styles";

export function Home() {
  const { user, SignOut } = useAuth();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

  const data = [
    {
      id: "1",
      name: "Pizza",
      description: "Ingredientes dessa pizza",
      photo_url: "https://github.com/joaovictormartin.png",
    },
    {
      id: "2",
      name: "Pizza",
      description: "Ingredientes dessa pizza",
      photo_url: "https://github.com/joaovictormartin.png",
    },
  ];

  function fecthPizza(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  function handleSearch() {
    fecthPizza(search);
  }

  function handleSearchClear() {
    setSearch('');
    fecthPizza('');
  }

  function handleSignOut() {
    SignOut();
  }

  useEffect(() => {
    fecthPizza("");
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmojis} />
          <GreetingText>Olá, {user?.name}</GreetingText>
        </Greeting>

        <SignOutContainer onPress={handleSignOut}>
          <SignOutIcon name="logout" />
        </SignOutContainer>
      </Header>

      <Search
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <MenuTitle>Cardápio</MenuTitle>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
}
