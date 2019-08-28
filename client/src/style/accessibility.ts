import { css } from "styled-components";
import { Colors } from "./colors";

export const focusStyle = css`
  :focus {
    outline: 2px solid ${Colors.ORANGE};
  }
`;
