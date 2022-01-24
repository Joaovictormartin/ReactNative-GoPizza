import styled from "styled-components/native";
import { TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  margin-top: -30px;
  padding: 0 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
  background-color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 52px;

  padding-left: 12px;

  font-size: 14px;
`;

export const ButtonClearContainer = styled.TouchableOpacity`
  margin-right: 7px;
`;

export const ButtonClearIcon = styled(Feather)`
  font-size: 16px;
`;

export const ButtonSearchContainer = styled.TouchableOpacity`
  width: 52px;
  height: 52px;

  align-items: center;
  justify-content: center;

  margin-left: 7px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

export const ButtonSearchIcon = styled(Feather)`
  font-size: 20px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;