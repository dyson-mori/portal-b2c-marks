import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ProductsProps } from '@/global/interfaces';
import { NotificationContext } from '@/hooks/notification';
import { Success } from '@/assets/svg/icons';

interface CartProps {
  storage: ProductsProps[];
  setStorage: (e: ProductsProps) => void;
};

export const CartContext = createContext({} as CartProps);

const Cart: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setNotification } = useContext(NotificationContext);

  const [state, setState] = useState<any>(() => {
    const storageValue = typeof window !== "undefined" ? localStorage.getItem('@marks: cart') : false;

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return [];
    }
  });

  const setStorage = (product: ProductsProps) => {
    if (!state || state.length === 0) {
      localStorage.setItem("@marks: cart", JSON.stringify([product]));
      setState([product]);
      return setNotification({ icon: Success, message: 'Product added to cart!', type: 'success', active: `${Math.random()}_show` });
    };

    const foundProduct = state?.find((e: any) => e.id === product.id);

    if (foundProduct) {
      const getCartWithoutProduct = state.filter((e: any) => e.id !== product.id).map((e: any) => e);
      localStorage.setItem("@marks: cart", JSON.stringify(getCartWithoutProduct));
      setState(getCartWithoutProduct);
      return setNotification({ icon: Success, message: 'Product removed from cart!', type: 'success', active: `${Math.random()}_show` });
    };

    const adding = [...state, product];
    localStorage.setItem("@marks: cart", JSON.stringify(adding));
    setState(adding);
    return setNotification({ icon: Success, message: 'Product added to cart!', type: 'success', active: `${Math.random()}_show` });
  };

  const value = {
    storage: state,
    setStorage
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default Cart;