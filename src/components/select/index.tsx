import React, { useState, useRef, useEffect, CSSProperties } from 'react';

import { Container, Icon, Input, DropDown, Button } from './styles';

import { Close, Tag } from '@/assets/svg';
import { CategoryProps } from '@/global/interfaces';
import { useTheme } from 'styled-components';

type ExportValue = {
  id?: string;
  name?: string;
};

interface DropDownProps {
  data: CategoryProps[];
  LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  defaultValue?: ExportValue[];
  placeholder: string;
  onChangeValue: (s: ExportValue[]) => void;
};

const Select: React.FC<DropDownProps> = ({ data, LeftIcon, defaultValue, placeholder, onChangeValue }) => {
  const themes = useTheme();

  const dropContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState([] as ExportValue[]);

  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);

  const styles = {
    opacity: open ? 1 : 0,
    zIndex: open ? 1 : -1,
    [Number(dropContainerRef.current?.offsetTop) > 500 ? 'bottom' : 'top']: 50
  };

  const handleCleanInput = () => {
    setSearch('');
    inputRef.current!.value = ''
    inputRef.current!.focus()
  };

  const handleSelect = (id: string, label: string) => {
    const items = values.find(e => e.id === id);

    if (items) {
      const c = values.filter((e) => e.id !== id);
      setValues(c);
    } else {
      setValues(prev => [...prev, { id, name: label }]);
    };

    setSearch('');
  };

  const handleClickOutside = (event: any) => {
    if (dropContainerRef.current && !dropContainerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  useEffect(() => {
    inputRef.current!.value = values.map(e => e.name).toString() as string;
    onChangeValue(values);
  }, [values])

  useEffect(() => {
    setValues(defaultValue!);
  }, [defaultValue]);

  return (
    <Container ref={dropContainerRef}>
      {LeftIcon && (
        <Icon>
          <Tag width={20} height={20} stroke={themes.colors.primary} strokeWidth={1.8} />
        </Icon>
      )}

      <Input
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={values.map(e => e.name).toString()}
        onFocus={() => setOpen(true)}
        onChange={evt => setSearch(evt.target.value)}
        // {...rest}
      />

      {search && (
        <Icon as='button' onClick={handleCleanInput}>
          <Close width={20} height={20} />
        </Icon>
      )}

      <DropDown style={styles}>
        {data?.filter(op =>
            op.name?.toLowerCase().includes(
              search?.split(',').reverse()[0].replace(' ', '').toLowerCase()
            )
          )
          .map(({ id, name }, index) => (
            <Button
              key={index.toString()}
              style={{
                backgroundColor: !!values.find(e => e.name === name) ? themes.colors.select : themes.colors.white,
                color: !!values.find(e => e.name === name) ? themes.colors.white : themes.colors.text,
                fontWeight: !!values.find(e => e.name === name) ? themes.font.weight['700'] : themes.font.weight['500'],
              }}
              onClick={(evt) => {
                evt.preventDefault();
                handleSelect(id, name);
              }}
            >
              <p>{name}</p>
            </Button>
          ))
        }
      </DropDown>
    </Container>
  );
}

export { Select };