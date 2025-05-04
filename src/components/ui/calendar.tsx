// "use client"

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import {
//   DayPicker,
//   DateRange,
//   SelectRangeEventHandler
// } from "react-day-picker"
// import { startOfDay, setHours, isBefore } from "date-fns"
// import { de } from "date-fns/locale" // Importing the German locale


// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// export type CalendarProps = Omit<
//   React.ComponentProps<typeof DayPicker>,
//   "mode" | "selected" | "onSelect"
// > & {
//   selected?: DateRange
//   onSelect?: SelectRangeEventHandler
// }

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   selected,
//   onSelect,
//   ...props
// }: CalendarProps) {
//   const now = new Date()
//   const cutoff = setHours(startOfDay(now), 16) // Heute 16:00 Uhr
//   const today = startOfDay(now)
//   const tomorrow = startOfDay(new Date(now.getTime() + 24 * 60 * 60 * 1000))

//   // Einzelne Tage deaktivieren
//   function disableDate(date: Date) {
//     const selectedDay = startOfDay(date)

//     if (isBefore(selectedDay, today)) return true
//     if (selectedDay.getTime() === today.getTime() && now > cutoff) return true
//     if (selectedDay.getTime() === tomorrow.getTime() && now > cutoff) return true

//     return false
//   }

//   // Auswahl-Handler für Range-Auswahl
//   const handleSelectRange: SelectRangeEventHandler = (range, selectedDay, modifiers, e) => {
//     if (!range?.from || !range?.to) {
//       onSelect?.(range, selectedDay, modifiers, e)
//       return
//     }
  
//     const from = startOfDay(range.from)
//     const to = startOfDay(range.to)
  
//     const includesTomorrow =
//       from.getTime() <= tomorrow.getTime() &&
//       to.getTime() >= tomorrow.getTime()
  
//     if (now > cutoff && includesTomorrow) {
//       // Auswahl zurücksetzen, aber alle Parameter übergeben
//       onSelect?.(undefined, selectedDay, modifiers, e)
//     } else {
//       onSelect?.(range, selectedDay, modifiers, e)
//     }
//   }
  

//   return (
//     <DayPicker
//       mode="range"
//       showOutsideDays={showOutsideDays}
//       selected={selected}
//       onSelect={handleSelectRange}
//       locale={de}
//       disabled={disableDate}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "border-2 border-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ className, ...props }) => (
//           <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
//         ),
//         IconRight: ({ className, ...props }) => (
//           <ChevronRight className={cn("h-4 w-4", className)} {...props} />
//         ),
//       }}
//       {...props}
//     />
//   )
// }

// Calendar.displayName = "Calendar"

// export { Calendar }
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  DayPicker,
  DateRange,
  SelectRangeEventHandler
} from "react-day-picker"
import { startOfDay, setHours, isBefore, addDays } from "date-fns"
import { Locale } from "date-fns" // <-- hinzugefügt
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  selected?: DateRange
  onSelect?: SelectRangeEventHandler
  locale?: Locale // <-- hinzugefügt
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  locale,
  ...props
}: CalendarProps) {
  const now = new Date()
  const cutoff = setHours(startOfDay(now), 16)
  const today = startOfDay(now)
  const tomorrow = startOfDay(addDays(now, 1))

  function disableDate(date: Date) {
    const selectedDay = startOfDay(date)

    if (isBefore(selectedDay, today)) return true
    if (selectedDay.getTime() === today.getTime() && now > cutoff) return true
    if (selectedDay.getTime() === tomorrow.getTime() && now > cutoff) return true

    return false
  }

  const handleSelectRange: SelectRangeEventHandler = (range, selectedDay, modifiers, e) => {
    if (!range?.from || !range?.to) {
      onSelect?.(range, selectedDay, modifiers, e)
      return
    }

    const from = startOfDay(range.from)
    const to = startOfDay(range.to)

    const includesTomorrow =
      from.getTime() <= tomorrow.getTime() &&
      to.getTime() >= tomorrow.getTime()

    if (now > cutoff && includesTomorrow) {
      onSelect?.(undefined, selectedDay, modifiers, e)
    } else {
      onSelect?.(range, selectedDay, modifiers, e)
    }
  }

  return (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={handleSelectRange}
      locale={locale} // <-- übergeben
      showOutsideDays={showOutsideDays}
      disabled={disableDate}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "border-2 border-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
