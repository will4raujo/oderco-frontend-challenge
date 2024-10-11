import { Card } from "@/components/ui/card";
import Image from "next/image";
import referenceImage from "../../../public/gallery/reference-image.jpg";

export default function ProductCard() {
  return (
    <Card className="flex flex-col w-[260px] 2xl:w-[275px] gap-4 border-zinc-400 border-[1px] p-4 h-96">
      <div className="bg-zinc-500 max-w-[268px] max-h-[162px] overflow-hidden">
        <Image 
          src={referenceImage} 
          alt="Product" 
          width={268} 
          height={162} 
          className="object-cover w-full h-full" 
        />
      </div>
      <div className="grid grid-rows-[min-content_auto_min-content] gap-2">
        <span className="text-sm font-medium">Product Name</span>
        <span className="text-sm font-light">Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur modi, iste hic provident ullam animi expedita sed</span>
        <span className="text-sm font-medium">R$ 100,00</span>
      </div>
    </Card>
  );
}
