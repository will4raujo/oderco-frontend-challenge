'use client';
import CartItemDetails from "@/components/molecules/cart-item-details";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export default function CartPage() {
  return (
    <main className="my-6 flex flex-col md:grid grid-cols-6 gap-4 max-w-[1440px] px-4  lg:px-10">
      <div className="col-span-3 lg:col-span-4 flex flex-col gap-4 mb-4">
        <h2 className="text-2xl font-bold uppercase">seu carrinho</h2>
        <span>Total (1 item): <b>R$ 3.999,00</b></span>
        <div className="flex flex-col gap-4 flex-1">
          <CartItemDetails product={{ id: '1', name: 'Macbook Pro', price: 3999, image: 'https://via.placeholder.com/150' }} quantity={1} onRemove={() => { }} onQuantityChange={(quantity) => { }} />

          <CartItemDetails product={{ id: '1', name: 'Macbook Pro', price: 3999, image: 'https://via.placeholder.com/150' }} quantity={1} onRemove={() => { }} onQuantityChange={(quantity) => { }} />

          <CartItemDetails product={{ id: '1', name: 'Macbook Pro', price: 3999, image: 'https://via.placeholder.com/150' }} quantity={1} onRemove={() => { }} onQuantityChange={(quantity) => { }} />

          <CartItemDetails product={{ id: '1', name: 'Macbook Pro', price: 3999, image: 'https://via.placeholder.com/150' }} quantity={1} onRemove={() => { }} onQuantityChange={(quantity) => { }} />
        </div>

      </div>
      <Card className="col-span-3 lg:col-span-2 px-4 py-6 uppercase flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Resumo do pedido</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R$ 3.999,00</span>
        </div>
        <div className="flex justify-between">
          <span>Entrega</span>
          <span>R$ 0,00</span>
        </div>
        <hr className="border-[#141034] border-[1px]" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>R$ 3.999,00</span>
        </div>

        <div className="mt-4 h-full flex flex-col justify-between">

          <Button className="h-16 text-2xl uppercase">Finalizar compra</Button>

          <div className="mt-10 md:mt-0 flex flex-col gap-2">
            <a href="#" className="text-zinc-500 underline underline-offset-4">ajuda</a>
            <a href="#" className="text-zinc-500 underline underline-offset-4">reembolso</a>
            <a href="#" className="text-zinc-500 underline underline-offset-4">Entregas e frete</a>
            <a href="#" className="text-zinc-500 underline underline-offset-4">Trocas e devoluçÕes</a>
          </div>
        </div>
      </Card>
    </main>
  )
}