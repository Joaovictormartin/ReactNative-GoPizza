import React, { useState } from "react";
import { FlatList } from "react-native"
//import { useNavigation } from "@react-navigation/native";

import { OrderCard } from "../../components/OrderCard";

import {
  Container,
  Header,
  Title,
  Separator
} from "./styles";

export function Orders() {
  //const { navigate, goBack } = useNavigation();

  function renderItem({item, index}) {
    return(
      <OrderCard
        index={index}
        name="4Queijos"
        description="teste"
        status="Preparando"
      />
    )
  }

  function ItemSeparator() {
    return <Separator/>
  }

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={['1', '2' , '3', '4', '5', '6']}
        keyExtractor={item => item}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ 
          paddingBottom: 125,
          paddingHorizontal: 24
        }}
      />

    </Container>
  );
}
