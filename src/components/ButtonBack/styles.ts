import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;

export const Icon = styled(MaterialIcons)`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;


