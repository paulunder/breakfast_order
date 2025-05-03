// components/ProductCard.tsx
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  increment: () => void;
  decrement: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  quantity,
  imageUrl,
  increment,
  decrement,
}) => {
  return (
    <div className="space-y-2">
      <Label>{title} (€{price})</Label>
      <Card>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Image src={imageUrl} alt={title} width={200} height={150} className="rounded-md" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Button type="button" onClick={decrement} variant="outline" className="h-8 w-8">
                -
              </Button>
              <Input id={`${title}-quantity`} type="number" min="0" value={quantity} readOnly className="w-16 text-center" />
              <Button type="button" onClick={increment} variant="outline" className="h-8 w-8">
                +
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
