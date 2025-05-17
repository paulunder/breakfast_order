// import * as React from "react"
// import { Button } from "@/components/ui/button"
// import { format } from "date-fns"
// import Image from "next/image"

// // Funktion zur Validierung der E-Mail
// const isValidEmail = (email: string) =>
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// const BreakfastOrderButton = ({
//   apartmentNumber,
//   email,
//   date,
//   grZillertalQuantity,
//   grZillertalPrice,
//   klZillertalQuantity,
//   klZillertalPrice,
//   totalPrice,
// }: {
//   apartmentNumber: string
//   email: string
//   date: Date | undefined
//   grZillertalQuantity: number
//   grZillertalPrice: number
//   klZillertalQuantity: number
//   klZillertalPrice: number
//   totalPrice: number
// }) => {
//   const isDateDisabled = (date: Date | undefined) => {
//     if (!date) return true
//     return date.getTime() <= new Date().getTime()
//   }

//   const isFormValid =
//     date &&
//     !isDateDisabled(date) &&
//     apartmentNumber &&
//     email &&
//     isValidEmail(email)

//   return (
//     <div>
//       {/* Fehlermeldung, wenn ein Feld nicht ausgefüllt ist */}
//       {(!date || isDateDisabled(date) || !apartmentNumber || !email || !isValidEmail(email)) && (
//         <div className="text-sm text-red-600 mt-2 bg-red-100 p-2 rounded">
//           {!date
//             ? "Bitte ein Datum auswählen."
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
//           href={`https://wa.me/436767011119?text=${encodeURIComponent(
//             `Frühstücksbestellung:
//             Apartment: ${apartmentNumber}
//             Email: ${email}
//             Datum: ${date ? format(date, 'PPP') : 'Nicht angegeben'}
//             ${grZillertalQuantity > 0 ? `Zillertal Frühstück: ${grZillertalQuantity} x €${grZillertalPrice}` : ''}
//             ${klZillertalQuantity > 0 ? `Kleines Frühstück: ${klZillertalQuantity} x €${klZillertalPrice}` : ''}
//             Gesamtpreis: €${totalPrice.toFixed(2)}`
//           )}`}
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


import * as React from "react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import Image from "next/image"
import { DateRange } from "react-day-picker"

// Funktion zur Validierung der E-Mail
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const BreakfastOrderButton = ({
  apartmentNumber,
  email,
  date,
  grZillertalQuantity,
  grZillertalPrice,
  klZillertalQuantity,
  klZillertalPrice,
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
}: {
  apartmentNumber: string
  email: string
  date: DateRange | undefined
  grZillertalQuantity: number
  grZillertalPrice: number
  klZillertalQuantity: number
  klZillertalPrice: number
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
}) => {
  // Funktion zur Überprüfung, ob das Datum in der Vergangenheit liegt
  const isDateDisabled = (date: DateRange | undefined) => {
    if (!date || !date.from) return true
    return date.from.getTime() <= new Date().getTime() // Vergleiche nur mit dem "from"-Datum
  }

  const messageLines = [
    'Frühstücksbestellung:',
    `Apartment: ${apartmentNumber}`,
    `Email: ${email}`,
    date?.from ? `Datum: ${format(date.from, 'PPP')}` : '',
    date?.to ? `bis ${format(date.to, 'PPP')}` : '',
    grZillertalQuantity > 0 ? `großes Zillertal Frühstück: ${grZillertalQuantity} x €${grZillertalPrice}` : '',
    klZillertalQuantity > 0 ? `kleines Zillertal Frühstück: ${klZillertalQuantity} x €${klZillertalPrice}` : '',
    semmelQuantity > 0 ? `Semmel: ${semmelQuantity} x €${semmelPrice}` : '',
    kornspitzQuantity > 0 ? `Kornspitz: ${kornspitzQuantity} x €${kornspitzPrice}` : '',
    croissantQuantity > 0 ? `Croissant: ${croissantQuantity} x €${croissantPrice}` : '',
    bauernbrotQuantity > 0 ? `Bauernbrot: ${bauernbrotQuantity} x €${bauernbrotPrice}` : '',
    laugenstangeQuantity > 0 ? `Laugenstange: ${laugenstangeQuantity} x €${laugenstangePrice}` : '',
    esterhazyQuantity > 0 ? `Esterhazy: ${esterhazyQuantity} x €${esterhazyPrice}` : '',
    nussschneckeQuantity > 0 ? `Nussschnecke: ${nussschneckeQuantity} x €${nussschneckePrice}` : '',
    topfengolatschenQuantity > 0 ? `Topfengolatschen: ${topfengolatschenQuantity} x €${topfengolatschenPrice}` : '',
    marmorkuchenQuantity > 0 ? `Marmorkuchen: ${marmorkuchenQuantity} x €${marmorkuchenPrice}` : '',
    `Gesamtpreis: €${totalPrice.toFixed(2)}`
  ];
  
  // Final message
  const message = encodeURIComponent(messageLines.filter(Boolean).join('\n'));

  // Validierung des Formulars
  const isFormValid =
    date &&
    date.from &&
    !isDateDisabled(date) &&
    apartmentNumber &&
    email &&
    isValidEmail(email)

  return (
    <div>
      {/* Fehlermeldung, wenn ein Feld nicht ausgefüllt ist */}
      {(!date || !date.from || isDateDisabled(date) || !apartmentNumber || !email || !isValidEmail(email)) && (
        <div className="text-sm text-red-600 mt-2 bg-red-100 p-2 rounded">
          {!date
            ? "Bitte ein Datum auswählen."
            : !date.from
            ? "Bitte ein Startdatum auswählen."
            : isDateDisabled(date)
            ? "Das gewählte Datum liegt in der Vergangenheit."
            : !apartmentNumber
            ? "Bitte die Apartment-Nummer eingeben."
            : !email
            ? "Bitte die E-Mail-Adresse eingeben."
            : !isValidEmail(email)
            ? "Die E-Mail-Adresse ist ungültig."
            : null}
        </div>
      )}

      

      {/* Button zum Senden der Bestellung */}
      <Button
        asChild
        variant="outline"
        className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50"
        disabled={!isFormValid} // Button deaktiviert, wenn Formular ungültig
      >
        <a
          href={`https://wa.me/436767011119?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
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
    </div>
  )
}

export default BreakfastOrderButton
