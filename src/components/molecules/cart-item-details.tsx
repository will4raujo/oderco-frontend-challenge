import Image from "next/image";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Product } from "@/models/product.model";
import {formatPrice } from "@/utils/format-price";

type CartItemDetailsProps = {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

export default function CartiItemsDetails({ product, quantity, onRemove, onQuantityChange }: CartItemDetailsProps) {
  const { formatPriceFromLabel } = formatPrice;
  const formatedPrice = formatPriceFromLabel(product.price * quantity);

  return (
    <Card className="relative w-full flex  justify-between p-4 border rounded-md shadow-sm">
      <Image
        src={product.image} 
        alt={product.name} 
        className="object-contain mr-4"
        width={50}
        height={50}
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
        <Select onValueChange={(value) => onQuantityChange(Number(value))} value={quantity.toString()}>
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
      </div>

      <div className="flex flex-col items-end justify-end">
        <button 
          onClick={onRemove} 
          className="text-red-600 text-3xl hover:text-red-800 p-0 leading-none absolute top-1 right-2"
        >
          &times;
        </button>
        <span className="text-xl font-semibold self-end">{formatedPrice}</span>
      </div>
    </Card>
  );
};