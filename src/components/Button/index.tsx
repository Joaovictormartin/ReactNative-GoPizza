import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title, Load, TypeProps } from './styles';

type Props = TouchableOpacityProps & {
  type?: TypeProps;
  title: string;
  isLoaded?: boolean;
}

export function Button({
  type = 'primary',
  title,
  isLoaded = false,
  ...rest
}: Props) {
  return (
    <Container
      type={type}
      disabled={isLoaded}
      activeOpacity={0.6}
      {...rest}
    >
      {isLoaded ? <Load /> : <Title>{title}</Title>}
    </Container>
  )
}