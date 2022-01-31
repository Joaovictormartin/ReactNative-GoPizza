import React, { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/useAuth";
import { OrderCard } from "../../components/OrderCard";

import { Container, Header, Title, Separator } from "./styles";

export function Orders() {
  const { user } = useAuth();
  const { navigate, goBack } = useNavigation();

  const [orders, setOrders] = useState([]);

  function handlePizzaDelivery(id: string) {
    Alert.alert("Pedido", "Confirmar que a pizza foi entregue?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("orders").doc(id).update({
            status: "Entregue",
          });
        },
      },
    ]);
  }

  function renderItem({ item, index }) {
    return (
      <OrderCard
        index={index}
        data={item}
        disabled={item.status === "Entregue"}
        onPress={() => handlePizzaDelivery(item.id)}
      />
    );
  }

  function ItemSeparator() {
    return <Separator />;
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((docs) => {
          return {
            id: docs.id,
            ...docs.data(),
          };
        });
        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{
          paddingBottom: 125,
          paddingHorizontal: 24,
        }}
      />
    </Container>
  );
}
