import React, { FunctionComponent } from "react";
import styled from "styled-components";

type BreakpointValue = number | "auto";

interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

type GridBreakpoints = { readonly [bp in keyof Breakpoints]?: BreakpointValue };

export const Breakpoints: Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const GridWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GridChild = styled.div`
  flex: 1;
  margin: 0 1rem;

  @media (min-width: ${Breakpoints.sm}px) {
  }

  @media (min-width: ${Breakpoints.md}px) {
  }

  @media (min-width: ${Breakpoints.lg}px) {
  }

  @media (min-width: ${Breakpoints.xl}px) {
    max-width: 1500px;
  }
`;

export const Grid: FunctionComponent<{}> = ({ children }) => (
  <GridWrapper>
    <GridChild>{children}</GridChild>
  </GridWrapper>
);

export interface RowProps {
  wrapRow?: boolean;
  alignItems?: "center" | "flex-start" | "stretch" | "baseline";
  height?: number;
  justifyContent?: "space-between" | "flex-start" | "center";
  marginBottom?: number;
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: ${({ wrapRow = true }) => (wrapRow ? "wrap" : "no-wrap")};
  align-items: ${({ alignItems = "center" }) => alignItems};
  justify-content: ${({ justifyContent = "space-between" }) => justifyContent};
  margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}rem`};
`;

const fullSize = 12;

const formatPercentage = (value: BreakpointValue) =>
  value === "auto" ? "0" : `${(100 * value) / 12}%`;

const selectSize = (
  props: ColProps,
  breakpoint: keyof GridBreakpoints
): BreakpointValue => {
  if (breakpoint === "xs") {
    return props.xs || fullSize;
  } else if (breakpoint === "sm") {
    return props.sm || selectSize(props, "xs");
  } else if (breakpoint === "md") {
    return props.md || selectSize(props, "sm");
  } else if (breakpoint === "lg") {
    return props.lg || selectSize(props, "md");
  }

  return props.xl || selectSize(props, "lg");
};

const formatSize = (props: ColProps, breakpoints: keyof GridBreakpoints) =>
  formatPercentage(selectSize(props, breakpoints));

export interface ColProps extends GridBreakpoints {
  fullWidth?: boolean;
}

export const Col = styled.div<ColProps>`
  flex: ${props => (selectSize(props, "xs") ? "initial" : 1)};
  ${props => (props.fullWidth ? `min-width: ${formatSize(props, "xs")}` : "")};

  @media (min-width: ${Breakpoints.sm}px) {
    flex: ${props => (selectSize(props, "sm") ? "initial" : 1)};
    ${props =>
      props.fullWidth ? `min-width: ${formatSize(props, "sm")}` : ""};
  }

  @media (min-width: ${Breakpoints.md}px) {
    flex: ${props => (selectSize(props, "md") ? "initial" : 1)};
    ${props =>
      props.fullWidth ? `min-width: ${formatSize(props, "md")}` : ""};
  }

  @media (min-width: ${Breakpoints.lg}px) {
    flex: ${props => (selectSize(props, "lg") ? "initial" : 1)};
    ${props =>
      props.fullWidth ? `min-width: ${formatSize(props, "lg")}` : ""};
  }

  @media (min-width: ${Breakpoints.xl}px) {
    flex: ${props => (selectSize(props, "xl") ? "initial" : 1)};
    ${props =>
      props.fullWidth ? `min-width: ${formatSize(props, "xl")}` : ""};
  }
`;
