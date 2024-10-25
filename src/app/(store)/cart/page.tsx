import CartComponent from "@/components/organisms/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "carrinho"
};

export default function CartPage() {
  return (
    <CartComponent />
  );
};