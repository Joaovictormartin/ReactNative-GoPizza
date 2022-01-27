import React, { useState } from "react";
//import { useNavigation } from "@react-navigation/native";

import { ButtonBack } from "../../components/ButtonBack";

import {
  Container,
  Header,

} from "./styles";

export function Orders() {
  //const { navigate, goBack } = useNavigation();

  return (
    <Container>
      <Header>
        <ButtonBack onPress={() => {}} />
      </Header>

    </Container>
  );
}
