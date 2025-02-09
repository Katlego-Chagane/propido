"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { DateRange } from "react-day-picker"
import { eachDayOfInterval, format, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

const generateData = (dateRange: DateRange | undefined) => {
  if (!dateRange || !dateRange.from || !dateRange.to) {
    // Return default data for the last 7 days if dateRange is undefined
    const end = new Date();
    const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
    const days = eachDayOfInterval({ start, end });
    return days.map(day => ({
      date: format(day, "MMM dd"),
      new: Math.floor(Math.random() * 5),
      inProgress: Math.floor(Math.random() * 5),
      resolved: Math.floor(Math.random() * 5),
    }));
  }

  const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to });
  return days.map(day => ({
    date: format(day, "MMM dd"),
    new: Math.floor(Math.random() * 5),
    inProgress: Math.floor(Math.random() * 5),
    resolved: Math.floor(Math.random() * 5),
  }));
};

interface MaintenanceBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRange | undefined;
}

export function MaintenanceBarChart({ dateRange, className }: MaintenanceBarChartProps) {
  const data = generateData(dateRange)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
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
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey="new" stackId="a" fill="#f59e0b" name="New" />
        <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
        <Bar dataKey="resolved" stackId="a" fill="#22c55e" name="Resolved" />
      </BarChart>
    </ResponsiveContainer>
  )
}

