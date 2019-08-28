import React, {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes
} from "react";
import { FieldMetaState, FieldRenderProps } from "react-final-form";
import styled from "styled-components";
import { focusStyle } from "../../style/accessibility";
import { inputPadding, inputShadow } from "../../style/layout";

export interface InputProps<E extends HTMLInputElement = HTMLInputElement>
  extends FieldMetaState<string>,
    InputHTMLAttributes<E> {
  fullWidth?: boolean;
}

export const Input = styled.input<InputProps>`
    width: ${({ fullWidth = false }) => (fullWidth ? "100%" : "auto")};
    background: ${({ valid }) => (valid ? "none" : "red")};
    color: inherit;
    font-weight: inherit;
  
    ${inputPadding}
    ${inputShadow}
    ${focusStyle}
  `;

export const Label = styled.label``;

export const InputAdapter: FunctionComponent<
  FieldRenderProps<string, HTMLInputElement>
> = ({ input, meta, ...rest }) => (
  <Input
    {...input}
    {...rest}
    {...meta}
    onChange={(event: ChangeEvent<HTMLInputElement>) =>
      input.onChange(event.target.value)
    }
  />
);
