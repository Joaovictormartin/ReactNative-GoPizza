import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
  Container,
  Content,
  Image,
  Detail,
  Identification,
  Name,
  IconRight,
  Description,
  Line,
} from "./styles";

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = TouchableOpacityProps & {
  data: ProductProps;
};

export function ProductCard({ data, ...rest }: Props) {
  return (
    <Container>
      <Content activeOpacity={0.6} {...rest}>
        <Image source={{ uri: data?.photo_url }} />

        <Detail>
          <Identification>
            <Name>{data?.name}</Name>
            <IconRight name="chevron-right" />
          </Identification>
          
          <Description>{data?.description}</Description>
        </Detail>
      </Content>
      <Line />
    </Container>
  );
}
