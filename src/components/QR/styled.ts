import styled from "styled-components";
import { Image, View } from "@components";

export const QRContainer = styled(View)`
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const QRImage = styled(Image)`
  position: absolute;
  width: 70px;
  height: 70px;
`;

export const QRIconContainer = styled(View)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2%;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
