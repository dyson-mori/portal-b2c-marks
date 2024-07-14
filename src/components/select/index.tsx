import React, { useState, useRef, useEffect } from 'react';

import { Container, Icon, Input, DropDown, Button } from './styles';

import { Close } from '@/assets/svg';
import { CategoryProps } from '@/global/interfaces';

// interface DropDownProps extends React.InputHTMLAttributes<HTMLInputElement> {
interface DropDownProps {
  data: CategoryProps[];
  LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  defaultValue?: string;
  // RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onChangeValue: (s: string) => void;
};

const Select: React.FC<DropDownProps> = ({ data, LeftIcon, defaultValue, onChangeValue }) => {
  const dropContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState(
    [] as {
      name: string;
    }[]
  );

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

  const handleSelect = (label: string) => {
    const items = values.find(e => e.name === label);

    if (items) {
      const c = values.filter((e) => e.name !== label);
      setValues(c);
    } else {
      setValues(prev => [...prev, { name: label }]);
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
    onChangeValue(inputRef.current!.value)
  }, [values])

  useEffect(() => {
    inputRef.current!.value = defaultValue!
  }, [defaultValue]);

  return (
    <Container ref={dropContainerRef}>
      {LeftIcon && (
        <Icon>
          <LeftIcon width={20} height={20} />
        </Icon>
      )}

      <Input
        ref={inputRef}
        placeholder='Search'
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
              isSelected={String(!!values.find(e => e.name === name))}
              onClick={(evt) => {
                evt.preventDefault();
                handleSelect(name);
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