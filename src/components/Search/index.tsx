import React from "react";
import { TextInputProps } from "react-native";

import {
  Container,
  InputArea,
  Input,
  ButtonClearContainer,
  ButtonClearIcon,
  ButtonSearchContainer,
  ButtonSearchIcon,
} from "./styles";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear, ...rest }: Props) {
  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisa..." {...rest} />

        <ButtonClearContainer activeOpacity={0.6} onPress={onClear}>
          <ButtonClearIcon name="x" />
        </ButtonClearContainer>
      </InputArea>

      <ButtonSearchContainer activeOpacity={0.6} onPress={onSearch}>
        <ButtonSearchIcon name="search" />
      </ButtonSearchContainer>
    </Container>
  );
}
