import Header from "@/components/molecules/header";
import { ReactNode } from "react";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";

export default function StoreLayout({ children }: { children: ReactNode }) {  
  return (
    <div className="bg-zinc-50 min-h-screen grid grid-rows-[4rem_auto] max-w-full">
      <CartProvider>
        <Header />
        {children}
      </CartProvider>

      <Toaster />
    </div>
  )
}