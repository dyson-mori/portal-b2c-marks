import styled, { css } from 'styled-components';

import { themes } from '@/global/theme';
import { HTMLAttributes } from 'react';

type theme = typeof themes;

interface Pallets {
  fontSize?: keyof typeof themes.font.size;
}

export const Typography = styled.div<Pallets>`
  ${({ theme, color, fontSize = 'normal', fontWeight }) => css`
    font-size: ${theme.font.size[fontSize]};
  `};
`;
