import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon} from './styles';

export function ButtonBack({...rest} : TouchableOpacityProps) {
  return (
    <Container activeOpacity={0.6} {...rest}>
      <Icon name="chevron-left" />
    </Container>
  )
}