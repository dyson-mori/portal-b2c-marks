import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { useTheme } from 'styled-components';

import { Container, Content, Icon, Input, DropDown, Button } from './styles';

import { Close, Tag } from '@/assets/svg';
import { CategoryProps, ProductsProps } from '@/global/interfaces';

type ExportValue = {
  id: string;
  name: string;
  product: ProductsProps[]
};

interface DropDownProps {
  multiple?: boolean;
  data: CategoryProps[];
  placeholder: string;
  defaultValue?: string;
  onChangeValue: (s: string) => void;
  LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Select: React.FC<DropDownProps> = ({ data, multiple, LeftIcon, defaultValue, placeholder, onChangeValue, ...rest }) => {
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

  const handleSelect = (kso: CategoryProps) => {
    inputRef.current!.value = kso.title;
    inputRef.current!.blur()
    setOpen(false);
    return onChangeValue(kso.title)

    // const items = values.find(e => e.id === kso.id);

    // if (items) {
    //   const c = values.filter((e) => e.id !== kso.id);
    //   setValues(c);
    // } else {
    //   setValues(prev => [...prev, { id: kso.id, name: kso.name }]);
    // };

    // setSearch('');
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

  // useEffect(() => {
    // inputRef.current!.value = values.map(e => e.name).toString() as string;
    // onChangeValue(values);
  // }, [values])

  // useEffect(() => {
  //   setValues(defaultValue!);
  // }, [defaultValue]);

  return (
    <Container ref={dropContainerRef}>
      <Content>
        <Icon>
          <Tag width={20} height={20} stroke={themes.colors.primary} strokeWidth={1.8} />
        </Icon>

        <Input
          ref={inputRef}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onFocus={() => setOpen(true)}
          onChange={evt => {
            setSearch(evt.target.value)
            onChangeValue(evt.target.value)
          }}
          // {...rest}
        />
      </Content>

      <DropDown style={styles}>
        {data?.filter(op =>
            op.title.toLowerCase() === search.toLowerCase() ||
            op.title?.toLowerCase().includes(
              search?.split(',').reverse()[0].replace(' ', '').toLowerCase()
            )
          )
          .map((kso, index) => (
            <Button
              key={index.toString()}
              // style={{
              //   backgroundColor: !!values.find(e => e.name === kso.name) ? themes.colors.select : themes.colors.white,
              //   color: !!values.find(e => e.name === kso.name) ? themes.colors.white : themes.colors.text,
              //   fontWeight: !!values.find(e => e.name === kso.name) ? themes.font.weight['700'] : themes.font.weight['500'],
              // }}
              style={{
                backgroundColor: themes.colors.white
              }}
              onClick={(evt) => {
                evt.preventDefault();
                handleSelect(kso);
              }}
            >
              <p>{kso.title}</p>
            </Button>
          ))
        }
      </DropDown>
    </Container>
  );
}

export { Select };