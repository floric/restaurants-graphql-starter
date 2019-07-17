import React, { FC } from "react";
import styled from "styled-components";

import { CardHeader } from "./Headers";

interface CardProps {
  header: string;
}

export const Card: FC<CardProps> = ({ header, children }) => (
  <CardWrapper>
    <CardHeader>{header}</CardHeader>
    {children}
  </CardWrapper>
);

const CardWrapper = styled.div``;
