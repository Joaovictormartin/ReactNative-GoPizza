import React, { useState } from "react";
import { Platform } from "react-native";
//import { useNavigation } from "@react-navigation/native";

import { PIZZAS_TYPES } from "../../utils/pizzaTypes";
import { ButtonBack } from "../../components/ButtonBack";
import { RadioButton } from "../../components/RadioButton";

import { Container, Header, Photo, WrapperRadioButton } from "./styles";

export function Order() {
  //const { navigate, goBack } = useNavigation();

  const [ size, setSizes ] = useState('');

  function Sizes() {
    return(
      PIZZAS_TYPES.map(item => (
        <RadioButton 
          key={item.id} 
          title={item.name} 
          selected={size === item.id}
          onPress={() => setSizes(item.id)}
        />
      ))
    );
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>

      <Photo source={{ uri: "https://github.com/joaovictormartin.png" }}/>
      
      <WrapperRadioButton>{Sizes()}</WrapperRadioButton>

    </Container>
  );
}
