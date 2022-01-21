import styled from "styled-components/native";

export const Image = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  
  align-items: center;
  justify-content: center;
`;

export const Placeholder = styled.View`
  width: 160px;
  height: 160px;
  
  align-items: center;
  justify-content: center;
  
  border-radius: 80px;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const PlaceholderTitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};;
  color:  ${({ theme }) => theme.COLORS.SECONDARY_900};

  text-align: center;
`;


