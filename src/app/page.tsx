"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendOrderNotificationEmail } from "@/services/email";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Zillertaler Frühstück",
    description: "A hearty breakfast with local cheese, ham, and bread.",
    price: 9.5,
  },
  {
    id: 2,
    name: "Kaiser Schmarrn",
    description: "Caramelized pancake with raisins and apple sauce.",
    price: 7.0,
  },
  {
    id: 3,
    name: "Bircher Müsli",
    description: "Traditional swiss oat dish with fresh fruits and nuts.",
    price: 6.0,
  },
  {
    id: 4,
    name: "Ei im Glas",
    description: "Soft boiled egg in a glass",
    price: 3.5,
  },
];

export default function Home() {
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of menuItems) {
      total += (quantities[item.id] || 0) * item.price;
    }
    return total;
  };

  const total = calculateTotal();

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const orderItems = menuItems.map((item) => ({
      name: item.name,
      quantity: quantities[item.id] || 0,
      price: item.price,
    }));

    const order = {
      items: orderItems.filter((item) => item.quantity > 0),
      totalCost: total,
    };

    try {
      await sendOrderNotificationEmail(order, email);
      toast({
        title: "Success",
        description: "Order submitted! You will receive a confirmation email.",
      });
      setQuantities({}); // Clear quantities after successful submission
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Die Zillertalerin - Frühstück</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Price: €{item.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">
                    Quantity:
                  </label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="0"
                    value={quantities[item.id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p>Total: €{total.toFixed(2)}</p>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-xs mb-2"
        />
        <Button onClick={handleSubmit} disabled={total === 0}>
          Submit Order
        </Button>
      </div>
    </div>
  );
}
