"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'
import { DateRange, DateRangePicker } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"

import { cn } from "@/my-app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Combobox({ options, value, onChange, placeholder = "Select option..." }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DateRangePicker date={date} setDate={setDate} />
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

