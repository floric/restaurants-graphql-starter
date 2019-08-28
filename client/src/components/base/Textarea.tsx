import React, {
  ChangeEvent,
  FunctionComponent,
  TextareaHTMLAttributes
} from "react";
import { FieldMetaState, FieldRenderProps } from "react-final-form";
import styled from "styled-components";
import { focusStyle } from "../../style/accessibility";
import { inputPadding, inputShadow } from "../../style/layout";

export interface TextareaProps<
  E extends HTMLTextAreaElement = HTMLTextAreaElement
> extends FieldMetaState<string>, TextareaHTMLAttributes<E> {
  fullWidth?: boolean;
}

export const Textarea = styled.textarea<TextareaProps>`
    width: ${({ fullWidth }) => (fullWidth ? "100%" : undefined)};
    background: ${({ valid }) => (valid ? "none" : "red")};
    color: inherit;
    font-weight: inherit;

    ${inputPadding}
    ${inputShadow}
    ${focusStyle}
`;

export const TextareaAdapter: FunctionComponent<
  FieldRenderProps<string, HTMLTextAreaElement>
> = ({ input, meta, ...rest }) => (
  <Textarea
    {...input}
    {...rest}
    {...meta}
    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
      input.onChange(event.target.value)
    }
  />
);
