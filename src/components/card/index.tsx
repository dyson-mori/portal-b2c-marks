"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

import { CategoryProps } from '@/global/interfaces';
import { Container, Title, DropDown, Button } from './styles';

interface CardProps {
  title: string;
  data: CategoryProps[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selects: CategoryProps[];
  setSelect(f: any): void;
};

export const Card: React.FC<CardProps> = ({ data, title, icon: Icon, selects, setSelect }) => {
  const theme = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerButtonsRef = useRef<HTMLDivElement>(null);

  const handleOpen = (event: any) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      dropdownRef.current.style.height = `${containerButtonsRef.current?.getBoundingClientRect().height! + 40}px`
    };
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTimeout(() => {
        dropdownRef.current ? dropdownRef.current.style.height = '40px' : null
      }, 200);
    }
  };

  useEffect(() => {
    buttonRef.current?.addEventListener('click', handleOpen);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      buttonRef.current?.addEventListener('click', handleOpen);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={dropdownRef}>
      <Title ref={buttonRef} onClick={event => event.preventDefault()}>
        <Icon width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
        <p>{title}</p>
      </Title>
      <DropDown ref={containerButtonsRef}>
        {data.map((item, index) => (
          <Button
            style={{
              backgroundColor: theme.colors[selects.find(t => t.id === item.id) ? 'primary' : 'white'],
              color: theme.colors[selects.find(t => t.id === item.id) ? 'white' : 'text'],
              fontWeight: theme.font.weight[selects.find(t => t.id === item.id) ? 600 : 500],
            }}
            key={index.toString()}
            onClick={() => {
              setSelect((prev: CategoryProps[]) =>
                prev.find(t => t.id === item.id) ? prev.filter(d => d.id !== item.id) : [...prev, item]
              )
            }}
          >{item.title}</Button>
        ))}
      </DropDown>
    </Container>
  )
};
