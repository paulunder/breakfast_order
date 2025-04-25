'use client';

import React, {useState, useEffect} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {sendEmail} from '@/services/email-service';
import {toast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import {format, isPast, isToday, setHours, setMinutes, setSeconds} from 'date-fns';
import {Warehouse} from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Slot } from "@radix-ui/react-slot"


export default function Home() {
  const [zillertalQuantity, setZillertalQuantity] = useState(0);
  const [kleinesQuantity, setKleinesQuantity] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [email, setEmail] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);

  const zillertalPrice = 15; // Price for Zillertal Frühstück
  const kleinesPrice = 10; // Price for Kleines Frühstück
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Update total price whenever quantities or prices change
    setTotalPrice(zillertalQuantity * zillertalPrice + kleinesQuantity * kleinesPrice);
  }, [zillertalQuantity, kleinesQuantity, zillertalPrice, kleinesPrice]);

  const isDateSelectable = (date: Date) => {
    const now = new Date();
    const sixteenHoursToday = setHours(setMinutes(setSeconds(now, 0), 0), 16);

    if (isPast(date)) {
      return false; // Disable past dates
    }

    if (isToday(date) && now >= sixteenHoursToday) {
      return false; // Disable today's date if it's after 4 PM
    }

    return true; // Enable future dates and today's date if before 4 PM
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast({
        title: 'Error',
        description: 'Please select a date.',
      });
      return;
    }

    const now = new Date();
    const sixteenHoursToday = setHours(setMinutes(setSeconds(now, 0), 0), 16);

    if (isToday(date) && now >= sixteenHoursToday) {
      toast({
        title: 'Error',
        description: 'Orders for today must be placed before 4 PM.',
      });
      return;
    }

    if (zillertalQuantity === 0 && kleinesQuantity === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one breakfast.',
      });
      return;
    }

    const orderDetails = {
      date: date.toISOString(),
      email,
      apartmentNumber,
      zillertalQuantity,
      kleinesQuantity,
      totalPrice,
    };

    try {
      // Guest email
      await sendEmail({
        to: email,
        subject: 'Frühstücksglocke - Order Confirmation',
        body: `Your order has been placed:
          ${zillertalQuantity > 0 ? `${zillertalQuantity} x Zillertal Frühstück (€${zillertalPrice})` : ''}
          ${kleinesQuantity > 0 ? `${kleinesQuantity} x Kleines Frühstück (€${kleinesPrice})` : ''}
          on ${date.toLocaleDateString()}.
          Total Price: €${totalPrice}`,
      });

      // Owner email
      await sendEmail({
        to: 'owner@example.com',
        subject: 'Frühstücksglocke - New Order',
        body: `New order from Apartment ${apartmentNumber} for:
          ${zillertalQuantity > 0 ? `${zillertalQuantity} x Zillertal Frühstück (€${zillertalPrice})` : ''}
          ${kleinesQuantity > 0 ? `${kleinesQuantity} x Kleines Frühstück (€${kleinesPrice})` : ''}
          on ${date.toLocaleDateString()}. Guest email: ${email}
          Total Price: €${totalPrice}`,
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
    setZillertalQuantity(0);
    setKleinesQuantity(0);
    setDate(undefined);
    setEmail('');
    setApartmentNumber('');
  };

  const incrementZillertal = () => {
    setZillertalQuantity((prev) => prev + 1);
  };

  const decrementZillertal = () => {
    setZillertalQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const incrementKleines = () => {
    setKleinesQuantity((prev) => prev + 1);
  };

  const decrementKleines = () => {
    setKleinesQuantity((prev) => (prev > 0 ? prev - 1 : 0));
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
              {confirmation.zillertalQuantity > 0 && (
                <p className="text-gray-700">
                  Zillertal Frühstück: {confirmation.zillertalQuantity} x €{zillertalPrice}
                </p>
              )}
              {confirmation.kleinesQuantity > 0 && (
                <p className="text-gray-700">
                  Kleines Frühstück: {confirmation.kleinesQuantity} x €{kleinesPrice}
                </p>
              )}
              <p className="text-gray-700">
                Date: {new Date(confirmation.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                Apartment Number: {confirmation.apartmentNumber}
              </p>
              <p className="text-gray-700">
                Email: {confirmation.email}
              </p>
              <p className="text-gray-700">
                Total Price: €{confirmation.totalPrice}
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

              <div className="space-y-2">
                <Label htmlFor="zillertalQuantity">Zillertal Frühstück (€{zillertalPrice})</Label>
                <Card>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Image
                        src="https://picsum.photos/200/150"
                        alt="Zillertal Frühstück"
                        width={200}
                        height={150}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        A hearty breakfast option with local Zillertal specialties.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          type="button"
                          onClick={decrementZillertal}
                          variant="outline"
                          className="h-8 w-8"
                        >
                          -
                        </Button>
                        <Input
                          id="zillertalQuantity"
                          type="number"
                          min="0"
                          value={zillertalQuantity}
                          readOnly
                          className="w-16 text-center"
                        />
                        <Button
                          type="button"
                          onClick={incrementZillertal}
                          variant="outline"
                          className="h-8 w-8"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kleinesQuantity">Kleines Frühstück (€{kleinesPrice})</Label>
                <Card>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Image
                        src="https://picsum.photos/200/150"
                        alt="Kleines Frühstück"
                        width={200}
                        height={150}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        A light breakfast option to start your day.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          type="button"
                          onClick={decrementKleines}
                          variant="outline"
                          className="h-8 w-8"
                        >
                          -
                        </Button>
                        <Input
                          id="kleinesQuantity"
                          type="number"
                          min="0"
                          value={kleinesQuantity}
                          readOnly
                          className="w-16 text-center"
                        />
                        <Button
                          type="button"
                          onClick={incrementKleines}
                          variant="outline"
                          className="h-8 w-8"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={!isDateSelectable}
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

              <div>
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  type="text"
                  value={`€${totalPrice.toFixed(2)}`}
                  readOnly
                />
              </div>
              <Button
  asChild
  variant="outline"
  className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50"
>
  <a
    href={`https://wa.me/436767011119?text=${encodeURIComponent(
      `Frühstücksbestellung:
Apartment: ${apartmentNumber}
Email: ${email}
Datum: ${date ? format(date, 'PPP') : 'Nicht angegeben'}
${zillertalQuantity > 0 ? `Zillertal Frühstück: ${zillertalQuantity} x €${zillertalPrice}` : ''}
${kleinesQuantity > 0 ? `Kleines Frühstück: ${kleinesQuantity} x €${kleinesPrice}` : ''}
Gesamtpreis: €${totalPrice.toFixed(2)}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    
  <Image
    src="/images/whatsapp_green.png"
    alt="WhatsApp Logo"
    width={20}
    height={20}
    className="inline-block mr-2"
  />
  Bestellung senden
  </a>
</Button>

            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
