import { Text, View } from "@components";
import styled from "styled-components";

export const DeviceContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius / 2}px;
  padding: 0px 10px;
`;

export const DeviceInfoContainer = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const DeviceTitle = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.white,
  weight: 600,
  h4: true
}))`
  margin-bottom: 3px;
`;
