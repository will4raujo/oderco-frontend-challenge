import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CartItemDetailsProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

export default function CartiItemsDetails({ product, quantity, onRemove, onQuantityChange }: CartItemDetailsProps) {
  return (
    <Card className="relative w-full flex  justify-between p-4 border rounded-md shadow-sm">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-20 h-20 object-contain mr-4"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
        <Select>
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
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
        <span className="text-xl font-semibold self-end">R$ {product.price.toFixed(2)}</span>
      </div>
    </Card>
  );
};