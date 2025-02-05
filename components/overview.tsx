"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"
import { DateRange } from "@/types";
import { eachDayOfInterval, format } from 'date-fns';

const generateData = (property: string, dateRange: DateRange) => {
  const start = dateRange.from || new Date();
  const end = dateRange.to || new Date();
  const days = eachDayOfInterval({ start, end });

  return days.map(day => ({
    name: format(day, 'MMM dd'),
    total: property === 'all' 
      ? Math.floor(Math.random() * 5000) + 1000
      : Math.floor(Math.random() * 3000) + 500,
  }));
};

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedProperty: string;
  dateRange: DateRange | undefined;
}

export function Overview({ className, selectedProperty, dateRange, ...props }: OverviewProps) {
  const data = generateData(selectedProperty, dateRange || { from: new Date(), to: new Date() });
  return (
    <div className={cn("", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

