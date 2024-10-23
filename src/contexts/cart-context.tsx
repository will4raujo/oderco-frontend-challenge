'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

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
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('@wa-store:cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    }
  }, []);

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
    localStorage.setItem('@wa-store:cart', JSON.stringify(items.filter((item) => item.productId !== productId)));
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