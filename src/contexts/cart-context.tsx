'use client'
import { ReactNode, createContext, useContext, useState } from 'react';

interface CartItem {
  productId: string;
  quantity?: number;
}

interface ICartContext {
  items: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('@wa-store:cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
    return [];
  });

  function addToCart(productId: string) {
    setItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.productId === productId);

      if (itemExists) {
        return prevItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity ? item.quantity + 1 : 2 };
          }
          return item;
        });
      }

      localStorage.setItem('@wa-store:cart', JSON.stringify([...prevItems, { productId, quantity: 1 }]));

      return [...prevItems, { productId, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.productId !== productId);
    });
  }

  function clearCart() {
    setItems([]);
    localStorage.removeItem('@wa-store:cart');
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);