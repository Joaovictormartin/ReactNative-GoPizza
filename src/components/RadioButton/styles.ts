import styled from "styled-components/native";

export type RadioButtonProps = {
  selected: boolean;
};

export const Container = styled.TouchableOpacity<RadioButtonProps>`
  width: 104px;
  height: 82px;

  padding: 14px 16px;

  border-radius: 8px;
  border: 1px solid ${({ theme, selected }) => selected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
  background-color: ${({ theme, selected }) => selected ? theme.COLORS.SUCCESS_50 : theme.COLORS.TITLE};
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) =>  theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Radio = styled.View<RadioButtonProps>`
  width: 20px;
  height: 20px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid ${({ theme, selected }) => selected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};

  margin-bottom: 16px;
`;

export const Select = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme}) => theme.COLORS.SUCCESS_900};
`;
