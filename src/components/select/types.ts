import { InputHTMLAttributes } from "react";

interface DropDownProps extends InputHTMLAttributes<HTMLInputElement> {
  data: {
    id: string;
    label: string;
  }[];
  leftIcon?: any;
  rightIcon?: any;
  multiple?: boolean;
};

export type {
  DropDownProps
}