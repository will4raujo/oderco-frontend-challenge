'use client';
import CartItemDetails from "@/components/molecules/cart-item-details";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/models/product.model";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductsApi } from "@/services/products.service";

export default function CartComponent() {
  const { items, removeFromCart, clearCart } = useCart();
  const [productsFromCart, setProductsFromCart] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  const { getProductsFromCart } = ProductsApi;

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const totalValue = productsFromCart.reduce((acc, product) => {
    const quantity = quantities[product.id!] || 1;
    return acc + product.price * quantity;
  }, 0);

  const formatedTotalValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue);

  const finishPurchase = () => {
    clearCart();
    setQuantities({});
    setProductsFromCart([]);
  }

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsFromCart(items);
      setProductsFromCart(products);
    };

    fetchProducts();
  }, [items, clearCart]);


  return (
    <main className="my-6 flex flex-col md:grid grid-cols-6 gap-4 max-w-[1440px] px-4 lg:px-10">
      <div className="col-span-3 lg:col-span-4 flex flex-col gap-4 mb-4">
        <h2 className="text-2xl font-bold uppercase">seu carrinho</h2>
        <span>{`Total ${items.length} item(s): `}<b>{formatedTotalValue}</b></span>
        <div className="flex flex-col gap-4 flex-1">
          {productsFromCart.length === 0 && <span>Seu carrinho está vazio</span>}
          {productsFromCart.map((product) => (
            <CartItemDetails
              key={product.id}
              product={product}
              quantity={quantities[product.id!] || 1}
              onQuantityChange={(quantity) => handleQuantityChange(product.id!, quantity)}
              onRemove={() => handleRemoveFromCart(product.id!)}
            />
          ))}
        </div>
      </div>

      <Card className="col-span-3 lg:col-span-2 px-4 py-6 uppercase flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Resumo do pedido</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatedTotalValue}</span>
        </div>
        <div className="flex justify-between">
          <span>Entrega</span>
          <span>R$ 0,00</span>
        </div>
        <hr className="border-[#141034] border-[1px]" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatedTotalValue}</span>
        </div>

        <div className="mt-4 h-full flex flex-col justify-between">
          <Dialog>
            <DialogTrigger asChild onClick={finishPurchase}>
              <Button className="h-16 text-2xl uppercase">Finalizar compra</Button>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center flex-col gap-10">
            <DialogHeader>
              <DialogTitle className="text-2xl">Compra finalizada com sucesso!</DialogTitle>
            </DialogHeader>
                <CircleCheckBig className="scale-[3]" color="#2aac28"/>
              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant="default">FECHAR</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="mt-10 md:mt-0 flex flex-col gap-2">
            <a href="#" className="text-zinc-500 underline underline-offset-4">ajuda</a>
            <a href="#" className="text-zinc-500 underline underline-offset-4">reembolso</a>
            <a href="#" className="text-zinc-500 underline underline-offset-4">Entregas e frete</a>
            <a href="#" className="text-zinc-500 underline underline-offset-4">Trocas e devoluções</a>
          </div>
        </div>
      </Card>
    </main>
  );
}
