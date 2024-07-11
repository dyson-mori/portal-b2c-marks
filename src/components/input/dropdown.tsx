import React from 'react';

import { DropDown as DropDownStyled } from './styles';

interface DropDownProps {
  data: {
    id: string;
    label: string;
  }[];
}

export const DropDown: React.FC<DropDownProps> = ({ data }) => {
  return (
    <DropDownStyled>

    </DropDownStyled>
  )
};
