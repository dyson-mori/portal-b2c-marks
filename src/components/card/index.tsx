"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

import { Container, Title, DropDown, Button } from './styles';
import { Category } from '@prisma/client';

interface CardProps {
  maxHeight: number;
  title: string;
  data: Category[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selects: Category[];
  setSelect(f: any): void;
};

export const Card: React.FC<CardProps> = ({ data, title, maxHeight, icon: Icon, selects, setSelect }) => {
  const theme = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = (event: any) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      dropdownRef.current.style.height = `${maxHeight}px`
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

  // useEffect(() => {
  //   setSelect(selects)
  // }, [selects]);

  return (
    <Container ref={dropdownRef}>
      <Title ref={buttonRef} onClick={event => event.preventDefault()}>
        <Icon width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
        <p>{title}</p>
      </Title>
      <DropDown>
        {data.map((item, index) => (
          <Button
            style={{
              backgroundColor: theme.colors[selects.find(t => t.id === item.id) ? 'select' : 'white'],
              color: theme.colors[selects.find(t => t.id === item.id) ? 'white' : 'text'],
            }}
            key={index.toString()}
            onClick={() => {
              setSelect((prev: Category[]) =>
                prev.find(t => t.id === item.id) ? prev.filter(d => d.id !== item.id) : [...prev, item]
              )
            }}
          >{item.name}</Button>
        ))}
      </DropDown>
    </Container>
  )
};
