import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { Button } from "../../components/Button";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  width: 32px;
  height: 32px;

  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const SignOutContainer = styled.TouchableOpacity``;

export const SignOutIcon = styled(MaterialIcons)`
  font-size: 24px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;
