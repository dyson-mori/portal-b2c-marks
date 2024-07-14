import { FC, SVGProps, InputHTMLAttributes } from "react";

interface DropDownProps extends InputHTMLAttributes<HTMLInputElement> {
  data: {
    id: string;
    label: string;
  }[];
  LeftIcon?: FC<SVGProps<SVGSVGElement>>;
  RightIcon?: FC<SVGProps<SVGSVGElement>>;
  multiple?: boolean;
  // onChangeValue: (s: string) => void;
};

export type {
  DropDownProps
}