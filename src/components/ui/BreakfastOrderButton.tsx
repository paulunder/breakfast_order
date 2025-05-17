

// import * as React from "react"
// import { Button } from "@/components/ui/button"
// import { format } from "date-fns"
// import Image from "next/image"
// import { DateRange } from "react-day-picker"

// // Funktion zur Validierung der E-Mail
// const isValidEmail = (email: string) =>
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// const BreakfastOrderButton = ({
//   apartmentNumber,
//   email,
//   date,
//   klzillertalQuantity,
//   klzillertalPrice,
//   grzillertalQuantity,
//   grzillertalPrice,
//   semmelQuantity,
//   semmelPrice,
//   kornspitzQuantity,
//   kornspitzPrice,
//   croissantQuantity,
//   croissantPrice,
//   bauernbrotQuantity,
//   bauernbrotPrice,
//   laugenstangeQuantity,
//   laugenstangePrice,
//   esterhazyQuantity,
//   esterhazyPrice,
//   nussschneckeQuantity,
//   nussschneckePrice,
//   topfengolatschenQuantity,
//   topfengolatschenPrice,
//   marmorkuchenQuantity,
//   marmorkuchenPrice,
//   totalPrice,
// }: {
//   apartmentNumber: string
//   email: string
//   date: DateRange | undefined
//   klzillertalQuantity: number
//   klzillertalPrice: number
//   grzillertalQuantity: number
//   grzillertalPrice: number
//   semmelQuantity: number
//   semmelPrice: number
//   kornspitzQuantity: number
//   kornspitzPrice: number
//   croissantQuantity: number
//   croissantPrice: number
//   bauernbrotQuantity: number
//   bauernbrotPrice: number
//   laugenstangeQuantity: number
//   laugenstangePrice: number
//   esterhazyQuantity: number
//   esterhazyPrice: number
//   nussschneckeQuantity: number
//   nussschneckePrice: number
//   topfengolatschenQuantity: number
//   topfengolatschenPrice: number
//   marmorkuchenQuantity: number
//   marmorkuchenPrice: number
//   totalPrice: number
// }) => {
//   // Funktion zur Überprüfung, ob das Datum in der Vergangenheit liegt
//   const isDateDisabled = (date: DateRange | undefined) => {
//     if (!date || !date.from) return true
//     return date.from.getTime() <= new Date().getTime() // Vergleiche nur mit dem "from"-Datum
//   }

//   const messageLines = [
//     'Frühstücksbestellung:',
//     `Apartment: ${apartmentNumber}`,
//     `Email: ${email}`,
//     date?.from ? `Datum: ${format(date.from, 'PPP')}` : '',
//     date?.to ? `bis ${format(date.to, 'PPP')}` : '',
//     klzillertalQuantity > 0 ? `Zillertal Frühstück: ${klzillertalQuantity} x €${klzillertalPrice}` : '',
//     grzillertalQuantity > 0 ? `Kleines Frühstück: ${grzillertalQuantity} x €${grzillertalPrice}` : '',
//     semmelQuantity > 0 ? `Semmel: ${semmelQuantity} x €${semmelPrice}` : '',
//     kornspitzQuantity > 0 ? `Kornspitz: ${kornspitzQuantity} x €${kornspitzPrice}` : '',
//     croissantQuantity > 0 ? `Croissant: ${croissantQuantity} x €${croissantPrice}` : '',
//     bauernbrotQuantity > 0 ? `Bauernbrot: ${bauernbrotQuantity} x €${bauernbrotPrice}` : '',
//     laugenstangeQuantity > 0 ? `Laugenstange: ${laugenstangeQuantity} x €${laugenstangePrice}` : '',
//     esterhazyQuantity > 0 ? `Esterhazy: ${esterhazyQuantity} x €${esterhazyPrice}` : '',
//     nussschneckeQuantity > 0 ? `Nussschnecke: ${nussschneckeQuantity} x €${nussschneckePrice}` : '',
//     topfengolatschenQuantity > 0 ? `Topfengolatschen: ${topfengolatschenQuantity} x €${topfengolatschenPrice}` : '',
//     marmorkuchenQuantity > 0 ? `Marmorkuchen: ${marmorkuchenQuantity} x €${marmorkuchenPrice}` : '',
//     `Gesamtpreis: €${totalPrice.toFixed(2)}`
//   ];
  
//   // Final message
//   const message = encodeURIComponent(messageLines.filter(Boolean).join('\n'));

//   // Validierung des Formulars
//   const isFormValid =
//     date &&
//     date.from &&
//     !isDateDisabled(date) &&
//     apartmentNumber &&
//     email &&
//     isValidEmail(email)

//   return (
//     <div>
//       {/* Fehlermeldung, wenn ein Feld nicht ausgefüllt ist */}
//       {(!date || !date.from || isDateDisabled(date) || !apartmentNumber || !email || !isValidEmail(email)) && (
//         <div className="text-sm text-red-600 mt-2 bg-red-100 p-2 rounded">
//           {!date
//             ? "Bitte ein Datum auswählen."
//             : !date.from
//             ? "Bitte ein Startdatum auswählen."
//             : isDateDisabled(date)
//             ? "Das gewählte Datum liegt in der Vergangenheit."
//             : !apartmentNumber
//             ? "Bitte die Apartment-Nummer eingeben."
//             : !email
//             ? "Bitte die E-Mail-Adresse eingeben."
//             : !isValidEmail(email)
//             ? "Die E-Mail-Adresse ist ungültig."
//             : null}
//         </div>
//       )}

      

//       {/* Button zum Senden der Bestellung */}
//       <Button
//         asChild
//         variant="outline"
//         className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50"
//         disabled={!isFormValid} // Button deaktiviert, wenn Formular ungültig
//       >
//         <a
//           href={`https://wa.me/436767011119?text=${message}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
//         >
//           <Image
//             src="/images/whatsapp_green.png"
//             alt="WhatsApp Logo"
//             width={20}
//             height={20}
//             className="inline-block mr-2"
//           />
//           Bestellung senden
//         </a>
//       </Button>
//     </div>
//   )
// }

// export default BreakfastOrderButton
"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import Image from "next/image"
import { DateRange } from "react-day-picker"

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

type Props = {
  apartmentNumber: string
  email: string
  date: DateRange | undefined
  klzillertalQuantity: number
  klzillertalPrice: number
  grzillertalQuantity: number
  grzillertalPrice: number
  semmelQuantity: number
  semmelPrice: number
  kornspitzQuantity: number
  kornspitzPrice: number
  croissantQuantity: number
  croissantPrice: number
  bauernbrotQuantity: number
  bauernbrotPrice: number
  laugenstangeQuantity: number
  laugenstangePrice: number
  esterhazyQuantity: number
  esterhazyPrice: number
  nussschneckeQuantity: number
  nussschneckePrice: number
  topfengolatschenQuantity: number
  topfengolatschenPrice: number
  marmorkuchenQuantity: number
  marmorkuchenPrice: number
  totalPrice: number
}

const BreakfastOrderButton: React.FC<Props> = (props) => {
  const {
    apartmentNumber,
    email,
    date,
    klzillertalQuantity,
    klzillertalPrice,
    grzillertalQuantity,
    grzillertalPrice,
    semmelQuantity,
    semmelPrice,
    kornspitzQuantity,
    kornspitzPrice,
    croissantQuantity,
    croissantPrice,
    bauernbrotQuantity,
    bauernbrotPrice,
    laugenstangeQuantity,
    laugenstangePrice,
    esterhazyQuantity,
    esterhazyPrice,
    nussschneckeQuantity,
    nussschneckePrice,
    topfengolatschenQuantity,
    topfengolatschenPrice,
    marmorkuchenQuantity,
    marmorkuchenPrice,
    totalPrice,
  } = props

  const isDateDisabled = (date: DateRange | undefined) => {
    if (!date || !date.from) return true
    const now = new Date()
    now.setHours(16, 0, 0, 0)
    return date.from.getTime() < now.getTime()
  }

  const isFormValid =
    date?.from &&
    !isDateDisabled(date) &&
    apartmentNumber.trim() !== '' &&
    isValidEmail(email)

  const formatLine = (label: string, quantity: number, price: number) =>
    quantity > 0 ? `${label}: ${quantity} x €${price.toFixed(2)}` : ''

  const messageLines = [
    `Frühstücksbestellung`,
    `Apartment: ${apartmentNumber}`,
    `Email: ${email}`,
    date?.from ? `Datum: ${format(date.from, 'PPP')}` : '',
    date?.to ? `bis ${format(date.to, 'PPP')}` : '',
    '',
    formatLine('Zillertal Frühstück', klzillertalQuantity, klzillertalPrice),
    formatLine('Kleines Frühstück', grzillertalQuantity, grzillertalPrice),
    formatLine('Semmel', semmelQuantity, semmelPrice),
    formatLine('Kornspitz', kornspitzQuantity, kornspitzPrice),
    formatLine('Croissant', croissantQuantity, croissantPrice),
    formatLine('Bauernbrot', bauernbrotQuantity, bauernbrotPrice),
    formatLine('Laugenstange', laugenstangeQuantity, laugenstangePrice),
    formatLine('Esterhazy', esterhazyQuantity, esterhazyPrice),
    formatLine('Nussschnecke', nussschneckeQuantity, nussschneckePrice),
    formatLine('Topfengolatschen', topfengolatschenQuantity, topfengolatschenPrice),
    formatLine('Marmorkuchen', marmorkuchenQuantity, marmorkuchenPrice),
    '',
    `Gesamtpreis: €${totalPrice.toFixed(2)}`,
  ].filter(Boolean).join('\n')

  const handleOrderSubmission = async () => {
    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Ihre Frühstücksbestellung',
          text: messageLines,
        }),
      })

      if (res.ok) {
        alert('Bestellung erfolgreich gesendet!')
      } else {
        const data = await res.json()
        alert(`Fehler beim Senden: ${data.message}`)
      }
    } catch (error) {
      alert('Netzwerkfehler beim Senden der Bestellung.')
      console.error(error)
    }
  }

  return (
    <div>
      {!isFormValid && (
        <div className="text-sm text-red-600 mt-2 bg-red-100 p-2 rounded">
          {!date
            ? "Bitte ein Datum auswählen."
            : !date.from
            ? "Bitte ein Startdatum auswählen."
            : isDateDisabled(date)
            ? "Das gewählte Datum liegt in der Vergangenheit oder ist nach 16 Uhr."
            : !apartmentNumber
            ? "Bitte die Apartment-Nummer eingeben."
            : !email
            ? "Bitte die E-Mail-Adresse eingeben."
            : !isValidEmail(email)
            ? "Die E-Mail-Adresse ist ungültig."
            : null}
        </div>
      )}
      <Button
        variant="outline"
        className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50"
        disabled={!isFormValid}
        onClick={handleOrderSubmission}
      >
        {/* <Image
          src="/images/email_icon.png"
          alt="E-Mail Logo"
          width={20}
          height={20}
          className="inline-block mr-2"
        /> */}
        Bestellung senden
      </Button>
    </div>
  )
}

export default BreakfastOrderButton
