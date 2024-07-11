"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { DropDownProps } from './types';
import { Container, DropDown, Input, Icon } from './styles';

const Select: React.FC<DropDownProps> = ({ data, leftIcon, rightIcon, multiple, ...rest }) => {
  const selectData = data.map(item => ({ ...item, select: false }));

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<any>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');

  const styles = {
    opacity: open ? 1 : 0,
    zIndex: open ? 1 : -1
  };

  const handleCleanInput = () => {
    setValue('');
    inputRef.current!.value = ''
    inputRef.current!.focus()
  };

  const handleSelect = (label: string) => {
    if (multiple) {
      const check = inputRef.current!.value.includes(label);
      const checkLeftComma = inputRef.current!.value.includes(`, ${label}`);
      const checkRightComma = inputRef.current!.value.includes(`${label},`);

      if (check) {
        inputRef.current!.value = inputRef.current!.value.replace(
          checkLeftComma ? `, ${label}` :
          checkRightComma ? `${label}, ` : label,
          ''
        );
      } else {
        inputRef.current!.value = inputRef.current!.value ? inputRef.current!.value.concat(', ', label) : label;
      }
    } else {
      inputRef.current!.value = label
      inputRef.current!.blur()
      setOpen(false);
    }

    // setValue();
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <Container ref={dropdownRef}>
      {leftIcon && (
        <Icon>
          <Image src={leftIcon} width={20} height={20} alt='svg' />
        </Icon>
      )}
      <Input
        ref={inputRef}
        placeholder='Search'
        onFocus={() => setOpen(true)}
        onChange={evt => setValue(evt.target.value)}
        {...rest}
      />
      {rightIcon && value && (
        <Icon as='button' onClick={handleCleanInput}>
          <Image src={rightIcon} width={20} height={20} alt='svg' />
        </Icon>
      )}

      <DropDown style={styles}>
        {selectData
          .filter(op => 
            op.label.toLowerCase().includes(value.toLowerCase())
          )
          .map(({ id, label, select }, index) => (
            <button
              key={index.toString()}
              onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                handleSelect(label)
              }}
            >
              <p>{label}</p>
            </button>
          ))
        }
      </DropDown>
    </Container>
  )
}

export { Select };