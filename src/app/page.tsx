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
import {format, isPast, isToday, setHours, setMinutes, setSeconds, startOfDay, isBefore} from 'date-fns';
import {Warehouse} from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Slot } from "@radix-ui/react-slot"
import BreakfastOrderButton from "@/components/ui/BreakfastOrderButton"
import { DateRange } from 'react-day-picker';
import { de } from "date-fns/locale" // Importing the German locale
import ProductCard from '@/components/ui/ProductCard';




// export default function Home() {
//   const [zillertalQuantity, setZillertalQuantity] = useState(0);
//   const [kleinesQuantity, setKleinesQuantity] = useState(0);
//   const [dateRange, setDateRange] = useState<DateRange | undefined>();
//   const [email, setEmail] = useState('');
//   const [apartmentNumber, setApartmentNumber] = useState('');
//   const [confirmation, setConfirmation] = useState<any>(null);

//   const zillertalPrice = 15; // Price for Zillertal Frühstück
//   const kleinesPrice = 10; // Price for Kleines Frühstück
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     // Update total price whenever quantities or prices change
//     setTotalPrice(zillertalQuantity * zillertalPrice + kleinesQuantity * kleinesPrice);
//   }, [zillertalQuantity, kleinesQuantity, zillertalPrice, kleinesPrice]);

//   const isDateSelectable = (date: Date) => {
//     const now = new Date();
//     const sixteenHoursToday = setHours(setMinutes(setSeconds(now, 0), 0), 16);

//     if (isPast(date)) {
//       return false; // Disable past dates
//     }

//     if (isToday(date) && now >= sixteenHoursToday) {
//       return false; // Disable today's date if it's after 4 PM
//     }

//     return true; // Enable future dates and today's date if before 4 PM
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date) {
//       toast({
//         title: 'Error',
//         description: 'Please select a date.',
//       });
//       return;
//     }

//     const now = new Date();
//     const sixteenHoursToday = setHours(setMinutes(setSeconds(now, 0), 0), 16);

//     if (isToday(date) && now >= sixteenHoursToday) {
//       toast({
//         title: 'Error',
//         description: 'Orders for today must be placed before 4 PM.',
//       });
//       return;
//     }

//     if (zillertalQuantity === 0 && kleinesQuantity === 0) {
//       toast({
//         title: 'Error',
//         description: 'Please select at least one breakfast.',
//       });
//       return;
//     }

//     const orderDetails = {
//       date: date.toISOString(),
//       email,
//       apartmentNumber,
//       zillertalQuantity,
//       kleinesQuantity,
//       totalPrice,
//     };

//     try {
//       // Guest email
//       await sendEmail({
//         to: email,
//         subject: 'Frühstücksglocke - Order Confirmation',
//         body: `Your order has been placed:
//           ${zillertalQuantity > 0 ? `${zillertalQuantity} x Zillertal Frühstück (€${zillertalPrice})` : ''}
//           ${kleinesQuantity > 0 ? `${kleinesQuantity} x Kleines Frühstück (€${kleinesPrice})` : ''}
//           on ${date.toLocaleDateString()}.
//           Total Price: €${totalPrice}`,
//       });

//       // Owner email
//       await sendEmail({
//         to: 'owner@example.com',
//         subject: 'Frühstücksglocke - New Order',
//         body: `New order from Apartment ${apartmentNumber} for:
//           ${zillertalQuantity > 0 ? `${zillertalQuantity} x Zillertal Frühstück (€${zillertalPrice})` : ''}
//           ${kleinesQuantity > 0 ? `${kleinesQuantity} x Kleines Frühstück (€${kleinesPrice})` : ''}
//           on ${date.toLocaleDateString()}. Guest email: ${email}
//           Total Price: €${totalPrice}`,
//       });

//       setConfirmation(orderDetails);

//       toast({
//         title: 'Success',
//         description: 'Order placed successfully! Confirmation sent to your email.',
//       });
//     } catch (error: any) {
//       toast({
//         title: 'Error',
//         description: error.message || 'Failed to place order.',
//       });
//     }
//   };

//   const resetForm = () => {
//     setConfirmation(null);
//     setZillertalQuantity(0);
//     setKleinesQuantity(0);
//     setDate(undefined);
//     setEmail('');
//     setApartmentNumber('');
//   };

export default function Home() {
  const [zillertalQuantity, setZillertalQuantity] = useState(0);
  const [kleinesQuantity, setKleinesQuantity] = useState(0);
  const [semmelQuantity, setSemmelQuantity] = useState(0);
  const [kornspitzQuantity, setKornspitzQuantity] = useState(0);
  const [croissantQuantity, setCroissantQuantity] = useState(0);
  const [bauernbrotQuantity, setBauernbrotQuantity] = useState(0);
  const [laugenstangeQuantity, setLaugenstangeQuantity] = useState(0);
  const [esterhazyQuantity, setEsterhazyQuantity] = useState(0);
  const [nussschneckeQuantity, setNussschneckeQuantity] = useState(0);
  const [topfengolatschenQuantity, setTopfengolatschenQuantity] = useState(0);
  const [marmorkuchenQuantity, setMarmorkuchenQuantity] = useState(0);  
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [email, setEmail] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);

  const zillertalPrice = 15; // Price for Zillertal Frühstück
  const kleinesPrice = 10; // Price for Kleines Frühstück
  const semmelPrice = 0.80;
  const kornspitzPrice = 1.60;
  const croissantPrice = 2.50;
  const bauernbrotPrice = 1.00;
  const laugenstangePrice = 1.90;
  const esterhazyPrice = 5.00;
  const nussschneckePrice = 3.50;
  const topfengolatschenPrice = 3.50;
  const marmorkuchenPrice = 4.00;

  const extractDaysFromDateRange = (dateRange: DateRange | undefined): string[] => {
    if (!dateRange?.from) return [];

    const days: string[] = [];
    let currentDate = dateRange.from;

    while (currentDate <= (dateRange.to || dateRange.from)) {
      days.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    }

    return days;
  };


  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Update total price whenever quantities or prices change
    setTotalPrice((zillertalQuantity * zillertalPrice + kleinesQuantity * kleinesPrice + semmelPrice * semmelQuantity + kornspitzPrice * kornspitzQuantity + croissantPrice * croissantQuantity + bauernbrotPrice * bauernbrotQuantity + laugenstangePrice * laugenstangeQuantity + esterhazyPrice * esterhazyQuantity + nussschneckePrice * nussschneckeQuantity + topfengolatschenPrice * topfengolatschenQuantity + marmorkuchenPrice * marmorkuchenQuantity) * extractDaysFromDateRange(dateRange).length);
  }, [zillertalQuantity, kleinesQuantity, zillertalPrice, kleinesPrice, semmelPrice, semmelQuantity, kornspitzPrice, kornspitzQuantity, croissantPrice, croissantQuantity, bauernbrotPrice, bauernbrotQuantity, laugenstangePrice, laugenstangeQuantity, esterhazyPrice, esterhazyQuantity, nussschneckePrice, nussschneckeQuantity, topfengolatschenPrice, topfengolatschenQuantity, marmorkuchenPrice, marmorkuchenQuantity]);

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

    if (!dateRange?.from) {
      toast({
        title: 'Error',
        description: 'Please select at least one date.',
      });
      return;
    }

    const now = new Date();
    const sixteenHoursToday = setHours(setMinutes(setSeconds(now, 0), 0), 16);

    // Check if the selected start date is today and after 4 PM
    if (
      isToday(dateRange.from) &&
      now >= sixteenHoursToday
    ) {
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
      fromDate: dateRange.from.toISOString(),
      toDate: dateRange.to ? dateRange.to.toISOString() : dateRange.from.toISOString(),
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
          on ${format(dateRange.from, 'PPP')}.
          ${dateRange.to ? `To: ${format(dateRange.to, 'PPP')}` : ''}
          Total Price: €${totalPrice}`,
      });

      // Owner email
      await sendEmail({
        to: 'owner@example.com',
        subject: 'Frühstücksglocke - New Order',
        body: `New order from Apartment ${apartmentNumber} for:
          ${zillertalQuantity > 0 ? `${zillertalQuantity} x Zillertal Frühstück (€${zillertalPrice})` : ''}
          ${kleinesQuantity > 0 ? `${kleinesQuantity} x Kleines Frühstück (€${kleinesPrice})` : ''}
          on ${format(dateRange.from, 'PPP')}.
          ${dateRange.to ? `To: ${format(dateRange.to, 'PPP')}` : ''}
          Guest email: ${email}
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
    setDateRange(undefined);
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

  const incrementSemmel = () => {
    setSemmelQuantity((prev) => prev + 1);
  };
  const decrementSemmel = () => {
    setSemmelQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const incrementKornspitz = () => {
    setKornspitzQuantity((prev) => prev + 1);
  };
  const decrementKornspitz = () => {
    setKornspitzQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const incrementCroissant = () => {
    setCroissantQuantity((prev) => prev + 1);
  };
  const decrementCroissant = () => {
    setCroissantQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const incrementBauernbrot = () => {
    setBauernbrotQuantity((prev) => prev + 1);
  };
  const decrementBauernbrot = () => {
    setBauernbrotQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const incrementLaugenstange = () => {
    setLaugenstangeQuantity((prev) => prev + 1);
  };
  const decrementLaugenstange = () => {
    setLaugenstangeQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const incrementEsterhazy = () => {
    setEsterhazyQuantity((prev) => prev + 1);
  };
  const decrementEsterhazy = () => {
    setEsterhazyQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const incrementNussschnecke = () => {
    setNussschneckeQuantity((prev) => prev + 1);
  };
  const decrementNussschnecke = () => { 
    setNussschneckeQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  }
  const incrementTopfengolatschen = () => {
    setTopfengolatschenQuantity((prev) => prev + 1);
  };
  const decrementTopfengolatschen = () => {
    setTopfengolatschenQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  }
  const incrementMarmorkuchen = () => {
    setMarmorkuchenQuantity((prev) => prev + 1);
  };
  const decrementMarmorkuchen = () => {
    setMarmorkuchenQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  }




  function isDateDisabled(date: Date): boolean {
    const now = new Date()
    const today = startOfDay(now)
    const cutoff = setHours(today, 16)
    const selectedDay = startOfDay(date)
    const tomorrow = startOfDay(new Date(now.getTime() + 24 * 60 * 60 * 1000))

    if (isBefore(selectedDay, today)) return true
    if (selectedDay.getTime() === today.getTime() && now > cutoff) return true
    if (selectedDay.getTime() === tomorrow.getTime() && now > cutoff) return true

    return false
  }





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
            Bestelle dein Frühstück direkt ans Zimmer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {confirmation ? (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Bestellbestätigung</h2>
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
                Datum: {new Date(confirmation.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                Apartment Nummer: {confirmation.apartmentNumber}
              </p>
              <p className="text-gray-700">
                Email: {confirmation.email}
              </p>
              <p className="text-gray-700">
                Preis: €{confirmation.totalPrice}
              </p>
              <Button onClick={resetForm} className="bg-90ee90 text-white hover:bg-70ee70">
                Noch etwas bestellen
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="apartmentNumber">Apartment Nummer</Label>
                <Input
                  id="apartmentNumber"
                  type="text"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  required
                  placeholder="Appartment Nummer"
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

              <div className="h4">Frühstücksservice</div>

              <ProductCard
                title="kleines Zillertaler Frühstück"
                description="Marmelade, Butter, 1 Semmel, 1 Scheibe Bauernbrot, Wurst & Käse"
                price={zillertalPrice}
                quantity={zillertalQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementZillertal}
                decrement={decrementZillertal}
              />

              <ProductCard
                title="großes Zillertaler Frühstück"
                description="Marmelade, Butter, 1 Semmel, 1 Croissant, Schwarzbrot, Wurst & Käse"
                price={kleinesPrice}
                quantity={kleinesQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementKleines}
                decrement={decrementKleines}
              />

              <div className="border-t border-gray-300 my-4"></div>
              <div className="h4">Brötchenservice</div>

              <ProductCard
                title="Semmel"
                description=""
                price={semmelPrice}
                quantity={semmelQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementSemmel}
                decrement={decrementSemmel}
              />

              <ProductCard
                title="Kornspitz"
                description=""
                price={kornspitzPrice}
                quantity={kornspitzQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementKornspitz}
                decrement={decrementKornspitz}
              />

              <ProductCard
                title="Croissant"
                description=""
                price={croissantPrice}
                quantity={croissantQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementCroissant}
                decrement={decrementCroissant}
              />

              <ProductCard
                title="Bauernbrotscheibe"
                description=""
                price={bauernbrotPrice}
                quantity={bauernbrotQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementBauernbrot}
                decrement={decrementBauernbrot}
              />

              <ProductCard
                title="Laugenstange"
                description=""
                price={laugenstangePrice}
                quantity={laugenstangeQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementLaugenstange}
                decrement={decrementLaugenstange}
              />

              <div className="border-t border-gray-300 my-4"></div>
              <div className="h4">Süßes</div>

              <ProductCard
                title="Esterhazy"
                description=""
                price={esterhazyPrice}
                quantity={esterhazyQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementEsterhazy}
                decrement={decrementEsterhazy}
              />

              <ProductCard
                title="Nussschnecke"
                description=""
                price={nussschneckePrice}
                quantity={nussschneckeQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementNussschnecke}
                decrement={decrementNussschnecke}
              />

              <ProductCard
                title="Topfengolatsche"
                description=""
                price={topfengolatschenPrice}
                quantity={topfengolatschenQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementTopfengolatschen}
                decrement={decrementTopfengolatschen}
              />

              <ProductCard
                title="Marmorkuchen"
                description=""
                price={marmorkuchenPrice}
                quantity={marmorkuchenQuantity}
                imageUrl="https://picsum.photos/200/150"
                increment={incrementMarmorkuchen}
                decrement={decrementMarmorkuchen}
              />

              <div>
                <Label>Datum</Label>
                <Calendar
                  selected={dateRange}
                  onSelect={setDateRange}
                  locale={de}
                  className="rounded-md border bg-white"
                />
                {dateRange?.from && dateRange?.to ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {format(dateRange.from, 'PPP', { locale: de })} – {format(dateRange.to, 'PPP', { locale: de })}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Bitte wähle eine Zeitspanne aus.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="total">Summe</Label>
                <Input
                  id="total"
                  type="text"
                  value={`€${totalPrice.toFixed(2)}`}
                  readOnly
                />
              </div>

              
              <BreakfastOrderButton
                apartmentNumber={apartmentNumber}
                email={email}
                date={dateRange}
                zillertalQuantity={zillertalQuantity}
                zillertalPrice={zillertalPrice}
                kleinesQuantity={kleinesQuantity}
                kleinesPrice={kleinesPrice}
                semmelQuantity={semmelQuantity}
                semmelPrice={semmelPrice}
                kornspitzQuantity={kornspitzQuantity}
                kornspitzPrice={kornspitzPrice}
                croissantQuantity={croissantQuantity}
                croissantPrice={croissantPrice}
                bauernbrotQuantity={bauernbrotQuantity}
                bauernbrotPrice={bauernbrotPrice}
                laugenstangeQuantity={laugenstangeQuantity}
                laugenstangePrice={laugenstangePrice}
                esterhazyQuantity={esterhazyQuantity}
                esterhazyPrice={esterhazyPrice}
                nussschneckeQuantity={nussschneckeQuantity}
                nussschneckePrice={nussschneckePrice}
                topfengolatschenQuantity={topfengolatschenQuantity}
                topfengolatschenPrice={topfengolatschenPrice}
                marmorkuchenQuantity={marmorkuchenQuantity}
                marmorkuchenPrice={marmorkuchenPrice}
                totalPrice={totalPrice}
              />
    
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );

}
