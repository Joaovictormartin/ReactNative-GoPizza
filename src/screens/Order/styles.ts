import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Photo = styled.Image`
  width: 240px;
  height: 240px;

  border-radius: 120px;

  align-self: center;
  position: relative;
  top: -120px;
`;

export const WrapperRadioButton = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;
  margin-bottom: 40px;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;
