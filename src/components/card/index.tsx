"use client";

import React, { useEffect, useRef } from 'react';

import { Container, Title, DropDown, Button } from './styles';

interface CardProps {
  title: string;
  maxHeight: number;
  data: Array<any>;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const Card: React.FC<CardProps> = ({ data, title, maxHeight, icon: Icon }) => {
  console.log(`${data.length} * ${15} = ${data.length * 15}`);
  
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
        dropdownRef.current!.style.height = '50px'
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
        <Icon width={20} height={20} />
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
