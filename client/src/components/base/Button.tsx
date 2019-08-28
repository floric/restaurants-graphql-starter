import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  useCallback,
  useState
} from "react";
import styled, { css } from "styled-components";
import { focusStyle } from "../../style/accessibility";
import { Colors } from "../../style/colors";
import { inputPadding } from "../../style/layout";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => Promise<any> | any;
  loading?: boolean;
  background?: "transparent" | string;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  background: ${({ background = Colors.BLUE_LIGHT }) =>
    background === "transparent" ? "none" : background};
  color: ${({ background, disabled }) =>
    background === "transparent"
      ? "inherit"
      : disabled
      ? Colors.GRAY_MEDIUM
      : Colors.GRAY_DARK};
  border: none;
  border-radius: 0.3rem;
  ${inputPadding}

  :hover {
    ${({ disabled = false }) =>
      disabled
        ? ""
        : css`
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
          `}
  }

  ${focusStyle}
`;

export const Button: FunctionComponent<ButtonProps> = props => {
  const [isLoading, setLoading] = useState(false);
  const { onClick, children, loading, disabled, ...otherProps } = props;

  const extendedOnclick = useCallback(() => {
    const loadAsync = async () => {
      if (!onClick) {
        return;
      }

      setLoading(true);
      await onClick();
    };

    loadAsync();
  }, [onClick]);

  return isLoading || loading ? (
    <StyledButton {...otherProps} disabled>
      <FontAwesomeIcon icon="spinner" spin />
    </StyledButton>
  ) : (
    <StyledButton
      onClick={!!props.onClick ? extendedOnclick : undefined}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};
