import React from "react";
import styled from "styled-components";
import { focusStyle } from "../../style/accessibility";
import { inputPadding, inputShadow } from "../../style/layout";
import { Breakpoints } from "./Grid";
import { FunctionComponent } from "react";
import { FieldRenderProps } from "react-final-form";
import { ChangeEvent } from "react";

export const Select = styled.select`
  ${inputPadding}
  ${inputShadow}
  ${focusStyle}

  @media (max-width: ${Breakpoints.sm}px) {
    width: 100%;
  }
`;

export const SelectAdapter: FunctionComponent<
  FieldRenderProps<string, HTMLSelectElement>
> = ({ input, meta, ...rest }) => (
  <Select
    {...input}
    {...rest}
    {...meta}
    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
      input.onChange(event.target.value)
    }
  />
);
