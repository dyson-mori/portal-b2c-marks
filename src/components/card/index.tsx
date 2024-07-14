"use client";

import React, { useState, useEffect, useRef } from 'react';

import { Container, Title, DropDown, Button } from './styles';

interface CardProps {
  title: string;
  data: Array<any>;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const Card: React.FC<CardProps> = ({ data, title, icon: Icon }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = (event: any) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      dropdownRef.current.style.height = '210px'
    }
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      dropdownRef.current.style.height = '50px'
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
        <Icon width={25} height={25} />
        <p>{title}</p>
      </Title>
      <DropDown>
        {data.map((item, index) => (
          <Button
            key={index.toString()}
            onChange={e => {
              e.preventDefault();
            }}
          >{item.name}</Button>
        ))}
      </DropDown>
    </Container>
  )
};
