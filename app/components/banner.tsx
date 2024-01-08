import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <main className='flex justify-between items-center bg-[#2EC4B6] border-y-2 border-[#5D2E8C] py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
            <h1 className='text-6xl max-w-xl font-serif'>
                <span className='underline decoration-[#CCFF66] decoration-4'>
                    Your Blog
                </span>{" "}
                is a place to express yourself, and connect with your audience
            </h1>
            <h2 className='text-[#CCFF66]'>Like what you see? Contact me today for your consultation!</h2>
        </div>

        <img
            className='hidden md:inline-flex h-32 lg:h-full'
            src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
            alt=''
        />
    </main>
  )
}

export default Banner