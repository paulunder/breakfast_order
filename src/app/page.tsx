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
import { Plus, Minus } from "lucide-react";

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
  const [apartmentNumber, setApartmentNumber] = useState("");
  const { toast } = useToast();

  const handleIncrement = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max((prevQuantities[id] || 0) - 1, 0);
      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });
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

    if (!apartmentNumber) {
      toast({
        title: "Error",
        description: "Please enter your apartment number.",
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
      setEmail(""); // Clear email after successful submission
      setApartmentNumber(""); // Clear apartment number after successful submission
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        Die Zillertalerin - Frühstück
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="border-soft-gray shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-accent">
                {item.name}
              </CardTitle>
              <CardDescription className="text-soft-gray">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg text-foreground">
                  Price: €{item.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg text-foreground">
                    {quantities[item.id] || 0}
                  </span>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Order Summary
        </h2>
        <p className="text-xl text-foreground">
          Total: €{total.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center w-full max-w-md space-y-4 px-4">
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md shadow-sm text-lg"
        />
        <Input
          type="text"
          placeholder="Apartment Number"
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
          className="w-full rounded-md shadow-sm text-lg"
        />
        <Button
          onClick={handleSubmit}
          disabled={total === 0}
          className="w-full bg-accent text-primary-foreground rounded-md py-3 text-xl font-semibold hover:bg-burnt-orange focus:ring-2 focus:ring-burnt-orange focus:ring-offset-1"
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
}
