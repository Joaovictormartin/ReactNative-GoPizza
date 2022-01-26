import React, { useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import happyEmojis from "../../assets/png/happy.png";

import { useAuth } from "../../hooks/useAuth";
import { Search } from "../../components/Search";
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
  NewProductButton
} from "./styles";

export function Home() {
  const { user, SignOut } = useAuth();
  const { navigate } = useNavigation();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

  //função para carregar as pizza do BD
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

  //função para pesquisar
  function handleSearch() {
    fecthPizza(search);
  }

  //função para limpar o campo de pesquisar
  function handleSearchClear() {
    setSearch("");
    fecthPizza("");
  }

  //função para fazer Logout
  function handleSignOut() {
    SignOut();
  }

  //função para ir para teça de product
  function handleOpen(id: string) {
    navigate("product", { id });
  }

  //função para renderizar a lista
  function renderItem({ item }) {
    return <ProductCard data={item} onPress={() => handleOpen(item.id)} />;
  }

  //função para cadastrar product
  function handleAdd() {
    navigate("product", {})
  }

  useFocusEffect(
    useCallback(() => {
      fecthPizza("")
    },[])
  );

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
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      <NewProductButton
        type="secondary"
        title="Cadastrar pizza"
        onPress={handleAdd}
      />
    </Container>
  );
}
