"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {Checkbox} from "../components/checkbox"
import { PostBase, Category } from '../../config/typings'


interface Props {
    categories: Category[]
  }

export function PostFilters({ categories }: Props) {
  const searchParams = useSearchParams()
  const searchValues = Array.from(searchParams.entries())
  const router = useRouter()

  return (
    <form className='w-full'>
        <div className='w-full bg-[#5D2E8C] text-center mt-6 rounded-t-lg'>
            <h2 className='text-xl font-bold text-white'>Cartegories</h2>
        </div>

        <div>
          <ul className='py-6 px-6 border-2 border-[#5D2E8C] rounded-b-lg bg-[#2EC4B6] space-y-4'>
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex items-center space-x-4"
              >
                <Checkbox 
                  id={cat.title}
                  checked={searchValues.some(([ key, value ]) => key === 'category' && value === cat.title)}
                  onClick={(event) => {
                    const params = new URLSearchParams(searchParams)
                    const checked = event.currentTarget.dataset.state === "checked"

                    checked ? params.delete(cat._id) : params.set('category', cat.title)

                    router.replace(`?${params.toString()}`)
                  }}
                />
                <label htmlFor={cat.title} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {cat.title}
                </label>
              </div>
            ))}
          </ul>
        </div>
    </form>
  )
}
