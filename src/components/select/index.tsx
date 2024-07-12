"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { DropDownProps } from './types';
import { Container, DropDown, Input, Icon, Button } from './styles';

const Select: React.FC<DropDownProps> = ({ data, leftIcon, rightIcon, multiple, ...rest }) => {
  const selectData = data.map(item => ({ ...item, select: false }));

  const inputRef = useRef<HTMLInputElement>(null);
  const dropContainerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');

  const [selects, setSelects] = useState(selectData);

  const styles = {
    opacity: open ? 1 : 0,
    zIndex: open ? 1 : -1,
    [Number(dropContainerRef.current?.offsetTop) > 500 ? 'bottom' : 'top']: 50
  };

  // const valueSelect = selects.map(item => item.label);

  const handleCleanInput = () => {
    setValue('');
    inputRef.current!.value = ''
    inputRef.current!.focus()
  };

  const handleSelect = (id: string, label: string, select: boolean) => {
    const filter = selectData.map(data => data.id === id ? { ...data, select: !select} : data);

    setSelects(filter);
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

  return (
    <Container ref={dropContainerRef}>
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
      />

      <input type='hidden' value={inputRef.current?.value} {...rest} />

      {rightIcon && value && (
        <Icon as='button' onClick={handleCleanInput}>
          <Image src={rightIcon} width={20} height={20} alt='svg' />
        </Icon>
      )}

      <DropDown style={styles}>
        {selects
          .filter(op =>
            op.label.toLowerCase().includes(value.toLowerCase())
          )
          .map(({ id, label, select }, index) => (
            <Button
              key={index.toString()}
              isSelected={String(select)}
              onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                handleSelect(id, label, select)
              }}
            >
              <p>{label}</p>
            </Button>
          ))
        }
      </DropDown>
    </Container>
  )
}

export { Select };

// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// import { DropDownProps } from './types';
// import { Container, DropDown, Input, Icon } from './styles';

// const Select: React.FC<DropDownProps> = ({ data, leftIcon, rightIcon, multiple, ...rest }) => {
//   const selectData = data.map(item => ({ ...item, select: false }));

//   const inputRef = useRef<HTMLInputElement>(null);
//   const dropContainerRef = useRef<HTMLDivElement>(null);

//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState<string>('');

//   const styles = {
//     opacity: open ? 1 : 0,
//     zIndex: open ? 1 : -1,
//     [Number(dropContainerRef.current?.offsetTop) > (window.screen.height / 1.9) ? 'bottom' : 'top']: 50
//   };

//   const handleCleanInput = () => {
//     setValue('');
//     inputRef.current!.value = ''
//     inputRef.current!.focus()
//   };

// const handleSelect = (label: string) => {
//   if (multiple) {
//     const check = inputRef.current!.value.includes(label);
//     const checkLeftComma = inputRef.current!.value.includes(`, ${label}`);
//     const checkRightComma = inputRef.current!.value.includes(`${label},`);

//     if (check) {
//       inputRef.current!.value = inputRef.current!.value.replace(
//         checkLeftComma ? `, ${label}` :
//         checkRightComma ? `${label}, ` : label,
//         ''
//       );
//     } else {
//       inputRef.current!.value = inputRef.current!.value ? inputRef.current!.value.concat(', ', label) : label;
//     }
//   } else {
//     inputRef.current!.value = label
//     inputRef.current!.blur()
//     setOpen(false);
//   }

//   setValue(inputRef.current!.value);
// };

//   const handleClickOutside = (event: any) => {
//     if (dropContainerRef.current && !dropContainerRef.current.contains(event.target)) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, []);

//   return (
//     <Container ref={dropContainerRef}>
//       {leftIcon && (
//         <Icon>
//           <Image src={leftIcon} width={20} height={20} alt='svg' />
//         </Icon>
//       )}
//       <Input
//         ref={inputRef}
//         placeholder='Search'
//         onFocus={() => setOpen(true)}
//         onChange={evt => setValue(evt.target.value)}
//         {...rest}
//       />

//       {rightIcon && value && (
//         <Icon as='button' onClick={handleCleanInput}>
//           <Image src={rightIcon} width={20} height={20} alt='svg' />
//         </Icon>
//       )}

//       <DropDown style={styles}>
//         {selectData
//           .filter(op =>
//             op.label.toLowerCase().includes(value.toLowerCase())
//           )
//           .map(({ id, label, select }, index) => (
//             <button
//               key={index.toString()}
//               onClick={(evt) => {
//                 evt.preventDefault();
//                 evt.stopPropagation();
//                 handleSelect(id, label, select)
//               }}
//             >
//               <p>{label}</p>
//             </button>
//           ))
//         }
//       </DropDown>
//     </Container>
//   )
// }

// export { Select };