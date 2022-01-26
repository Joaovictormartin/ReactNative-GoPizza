import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title, Radio, Select, RadioButtonProps } from "./styles";

type Props = TouchableOpacityProps & RadioButtonProps & {
  title: string;
};

export function RadioButton({ selected = false, title, ...rest }: Props) {
  return (
    <Container selected={selected} {...rest}>
      <Radio selected={selected}>
        {selected && <Select/>}
      </Radio>

      <Title>{title}</Title>
    </Container>
  );
}
