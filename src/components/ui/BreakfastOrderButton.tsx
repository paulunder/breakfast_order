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
//   zillertalQuantity,
//   zillertalPrice,
//   kleinesQuantity,
//   kleinesPrice,
//   totalPrice,
// }: {
//   apartmentNumber: string
//   email: string
//   date: Date | undefined
//   zillertalQuantity: number
//   zillertalPrice: number
//   kleinesQuantity: number
//   kleinesPrice: number
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
//             ${zillertalQuantity > 0 ? `Zillertal Frühstück: ${zillertalQuantity} x €${zillertalPrice}` : ''}
//             ${kleinesQuantity > 0 ? `Kleines Frühstück: ${kleinesQuantity} x €${kleinesPrice}` : ''}
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
  zillertalQuantity,
  zillertalPrice,
  kleinesQuantity,
  kleinesPrice,
  totalPrice,
}: {
  apartmentNumber: string
  email: string
  date: DateRange | undefined
  zillertalQuantity: number
  zillertalPrice: number
  kleinesQuantity: number
  kleinesPrice: number
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
          href={`https://wa.me/436767011119?text=${encodeURIComponent(
            `Frühstücksbestellung:
            Apartment: ${apartmentNumber}
            Email: ${email}
            Datum: ${date?.from ? format(date.from, 'PPP') : 'Nicht angegeben'} 
            ${date?.to ? `bis ${format(date.to, 'PPP')}` : ''}
            ${zillertalQuantity > 0 ? `Zillertal Frühstück: ${zillertalQuantity} x €${zillertalPrice}` : ''}
            ${kleinesQuantity > 0 ? `Kleines Frühstück: ${kleinesQuantity} x €${kleinesPrice}` : ''}
            Gesamtpreis: €${totalPrice.toFixed(2)}`
          )}`}
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
