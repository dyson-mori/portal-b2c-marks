"use client";

import React, { useState, useEffect, useRef } from 'react';

import { Container, Title, DropDown } from './styles';

import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({ data, title }) => {
  const dropdownRef = useRef<any>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (event: any) => {
    event.preventDefault();
    setOpen(!open);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const styles = {
    // height: open ? 'auto' : 'auto'
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <Container style={styles} ref={dropdownRef}>
      <Title onClick={handleOpen}>{title}</Title>
      <DropDown>
        {data.map((item, index) => (
          <button key={index.toString()}>{item.name}</button>
        ))}
      </DropDown>
    </Container>
  )
};
