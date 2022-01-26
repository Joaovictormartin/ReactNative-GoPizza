import React, { useState } from "react";
import { Platform } from "react-native";
//import { useNavigation } from "@react-navigation/native";

import { ButtonBack } from "../../components/ButtonBack";

import { Container, Header, Photo } from "./styles";

export function Order() {
  //const { navigate, goBack } = useNavigation();

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>

      <Photo source={{ uri: "https://github.com/joaovictormartin.png" }}/>

      
    </Container>
  );
}
