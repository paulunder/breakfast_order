'use client';

import React, {useState} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {sendEmail} from '@/services/email-service';
import {toast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {Warehouse} from 'lucide-react';

const breakfastTypes = [
  {value: 'Zillertal Frühstück', label: 'Zillertal Frühstück'},
  {value: 'kleines Frühstück', label: 'Kleines Frühstück'},
];

export default function Home() {
  const [breakfastType, setBreakfastType] = useState(breakfastTypes[0].value);
  const [breakfastQuantity, setBreakfastQuantity] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [email, setEmail] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast({
        title: 'Error',
        description: 'Please select a date.',
      });
      return;
    }

    const orderDetails = {
      breakfastType,
      breakfastQuantity,
      date: date.toISOString(),
      email,
      apartmentNumber,
    };

    try {
      // Guest email
      await sendEmail({
        to: email,
        subject: 'Frühstücksglocke - Order Confirmation',
        body: `Your order for ${breakfastQuantity} x ${breakfastType} on ${date.toLocaleDateString()} has been placed.`,
      });

      // Owner email
      await sendEmail({
        to: 'owner@example.com',
        subject: 'Frühstücksglocke - New Order',
        body: `New order from Apartment ${apartmentNumber} for ${breakfastQuantity} x ${breakfastType} on ${date.toLocaleDateString()}. Guest email: ${email}`,
      });

      setConfirmation(orderDetails);

      toast({
        title: 'Success',
        description: 'Order placed successfully! Confirmation sent to your email.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to place order.',
      });
    }
  };

  const resetForm = () => {
    setConfirmation(null);
    setBreakfastType(breakfastTypes[0].value);
    setBreakfastQuantity(1);
    setDate(undefined);
    setEmail('');
    setApartmentNumber('');
  };

  const incrementBreakfast = () => {
    setBreakfastQuantity((prev) => prev + 1);
  };

  const decrementBreakfast = () => {
    setBreakfastQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-f5f5dc">
      <Toaster />
      <Card className="w-full max-w-md space-y-4 p-4 rounded-lg shadow-md border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center">
            <Warehouse className="mr-2 h-6 w-6" />
            Frühstücksglocke
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Order your breakfast for a delightful start to the day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {confirmation ? (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Order Confirmation</h2>
              <p className="text-gray-700">
                Breakfast Type: {confirmation.breakfastType}
              </p>
              <p className="text-gray-700">
                Quantity: {confirmation.breakfastQuantity}
              </p>
              <p className="text-gray-700">
                Date: {new Date(confirmation.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                Apartment Number: {confirmation.apartmentNumber}
              </p>
              <p className="text-gray-700">
                Email: {confirmation.email}
              </p>
              <Button onClick={resetForm} className="bg-90ee90 text-white hover:bg-70ee70">
                Place Another Order
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="apartmentNumber">Apartment Number</Label>
                <Input
                  id="apartmentNumber"
                  type="text"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  required
                  placeholder="Enter apartment number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="guest@example.com"
                />
              </div>
              <div>
                <Label htmlFor="breakfastType">Breakfast Type</Label>
                <Select value={breakfastType} onValueChange={setBreakfastType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select breakfast type" />
                  </SelectTrigger>
                  <SelectContent>
                    {breakfastTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="breakfastQuantity">Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    onClick={decrementBreakfast}
                    variant="outline"
                    className="h-8 w-8"
                  >
                    -
                  </Button>
                  <Input
                    id="breakfastQuantity"
                    type="number"
                    min="1"
                    value={breakfastQuantity}
                    readOnly
                    className="w-16 text-center"
                  />
                  <Button
                    type="button"
                    onClick={incrementBreakfast}
                    variant="outline"
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className={cn('rounded-md border bg-white')}
                />
                {date ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {format(date, 'PPP')}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Please select a date.
                  </p>
                )}
              </div>
              <Button className="bg-ffa07a text-white hover:bg-ff805a w-full">
                Place Order
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
