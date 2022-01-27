import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypesProps
} from "./styles";

type Props = TouchableOpacityProps & {
  index: number;
  name: string;
  description: string;
  status: StatusTypesProps;
};

export function OrderCard({ index, name, description, status, ...rest}: Props) {
  return (
    <Container
      index={index}
      activeOpacity={0.6}
      {...rest}
    >
      <Image source={{ uri: "https://github.com/joaovictormartin.png" }} />
      <Name>{name}</Name>
      <Description>{`${description} 🞄`}</Description>

      <StatusContainer status={status}> 
        <StatusLabel status={status}>{status}</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
