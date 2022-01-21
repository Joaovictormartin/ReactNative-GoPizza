import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type?: TypeProps
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  align-items: center;
  justify-content: center;

  max-height: 56px;
  min-height: 56px;

  border-radius: 12px;

  background-color: ${({ theme, type }) => type === 'primary'
    ? theme.COLORS.SUCCESS_900
    : theme.COLORS.PRIMARY_900
  };
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE
}))``;


