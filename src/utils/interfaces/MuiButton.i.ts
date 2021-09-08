import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

export type ColorTypes =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
  | "default"
  | "inherit"
  | "info";

export type ButtonProps = { color: ColorTypes } & Omit<MuiButtonProps, "color">;
