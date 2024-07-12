"use client";

import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import styled from 'styled-components';

interface IconProps {
  icon: StaticImport;
};

const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 100%;
`;

export const NotificationIcon: React.FC<IconProps> = ({ icon }) => (
  <Container>
    <Image src={icon} width={20} height={20} alt='svg' />
  </Container>
);