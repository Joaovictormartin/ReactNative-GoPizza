import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  height: 105px;
`;

export const Content = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;

  border-radius: 52px;
  margin-right: 20px;
`;

export const Detail = styled.View`
  flex: 1;
`;

export const Identification = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 20px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const IconRight = styled(Feather)`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Description = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_400};

  line-height: 20px;
  margin-right: 21px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;

  margin: 12px 0px;
  margin-left: 124px;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;
