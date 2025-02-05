"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { date: "Feb 10", reported: 3, inProgress: 2, resolved: 1 },
  { date: "Feb 11", reported: 2, inProgress: 3, resolved: 2 },
  { date: "Feb 12", reported: 4, inProgress: 1, resolved: 3 },
  { date: "Feb 13", reported: 3, inProgress: 2, resolved: 2 },
  { date: "Feb 14", reported: 2, inProgress: 3, resolved: 1 },
  { date: "Feb 15", reported: 5, inProgress: 2, resolved: 2 },
  { date: "Feb 16", reported: 3, inProgress: 4, resolved: 3 },
  { date: "Feb 17", reported: 4, inProgress: 2, resolved: 4 },
  { date: "Feb 18", reported: 2, inProgress: 3, resolved: 2 },
  { date: "Feb 19", reported: 3, inProgress: 2, resolved: 3 },
  { date: "Feb 20", reported: 4, inProgress: 3, resolved: 2 },
]

interface MaintenanceChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MaintenanceChart({ className }: MaintenanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="reported"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="inProgress"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="resolved"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

