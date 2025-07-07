"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMeterConsumptionChartData } from "../hooks/use-meter-consumption-chart.hooks"
import { Skeleton } from "@/components/ui/skeleton"




const chartConfig = {
  consumption: {
    label: "kwh",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;



type MeterConsumptionChartProps = {
  meterId: string;
}
export function MeterConsumptionChart({meterId}: MeterConsumptionChartProps) {
  const [filter, setFilter] = useState("5")
  const chartProps = {meterId, numberOfPastMonths: Number(filter)}
  const {data, isLoading, error, refetch} = useMeterConsumptionChartData(chartProps);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Meter Consumption (kwh)</CardTitle>
        <CardDescription>
          Showing meter consumption for the last {filter} months
        </CardDescription>
        <CardAction>
            <Select defaultValue={filter} onValueChange={setFilter}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3">Past 3 Months</SelectItem>
                    <SelectItem value="5">Past 5 Months</SelectItem>
                    <SelectItem value="12">Past Year</SelectItem>
                </SelectContent>
            </Select>
        </CardAction>
      </CardHeader>
      <CardContent className={!(error && isLoading)? "pl-0" : ""}>
        {error ? (<p className="mx-auto text-destructive text-sm">Error loading chart. <span className="font-bold cursor-pointer" onClick={()=> refetch()}><u>reload</u></span></p>): isLoading ? (<Skeleton className="h-[100px] rounded-sm"/>):(
        <ChartContainer config={chartConfig}>
          <AreaChart 
            accessibilityLayer 
            data={data}
            margin={{left:0}}
            >
            <CartesianGrid vertical={false} />
            <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={(props) => (<ChartTooltipContent {...props} indicator="line" />)}
            />
            <Area
              type="natural"
              dataKey="consumption"
              stroke="var(--ring)"
              fill="var(--ring)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
