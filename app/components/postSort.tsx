"use client"

import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select"

const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Oldest", value: "/?date=asc" },
]

export function ProductSort() {
  const router = useRouter()
  return (
    <div className="flex items-center w-full">
      <Select onValueChange={value => router.replace(value)}>
        <SelectTrigger className="bg-[#5D2E8C]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map( option => (
            <SelectItem key={option.name} value={option.value} className="bg-[#5D2E8C] hover:bg-[#2EC4B6]">
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
