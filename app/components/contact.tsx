"use client"

import { PostBase } from "@/config/typings";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'


interface CommForm {
    _id: string;
    name: string; //name?: string; means the input is not required
    email: string;
    comment: string;
}

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, formState: {errors} } = useForm<CommForm>()

    const onSubmit: SubmitHandler<CommForm> = (data) => {
        setSubmitted(true)
    }

    return(
        <>
            {submitted ? 
            (
                <div className='flex flex-col p-10 my-10 bg-[#2EC4B6] text-white max-w-2xl mx-auto'>
                    <h3 className='text-3xl font-bold'>
                        Thank you for signing up for our news letter!
                    </h3>
                    <p>You will see your first issue next month.</p>
                </div>
            )
            :

            (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
                <h4 className='text-3xl font-bold'>Sign up for our monthly news letter</h4>

                <hr className='py-3 mt-2'/>

                <label className='block mb-5'>
                    <span className='text-[#5D2E8C]'>Name</span>
                    <input 
                        {...register("name", { required: true })}
                        type="text" 
                        placeholder='Your Name'
                        className='shadow bg-transparent rounded-full py-2 px-3 form-input mt-1 block w-full outline-none focus:shadow-md focus:shadow-[#2EC4B6] placeholder-[#ccff6685] focus:placeholder-[#ccff66] cursor-pointer'
                    />
                </label>

                <label className='block mb-5'>
                    <span className='text-[#5D2E8C]'>Email</span>
                    <input 
                        {...register("email", { required: true })}
                        type="email" 
                        placeholder='Your Email'
                        className='shadow bg-transparent rounded-full py-2 px-3 form-input mt-1 block w-full outline-none focus:shadow-md focus:shadow-[#2EC4B6] placeholder-[#ccff6685] focus:placeholder-[#ccff66] cursor-pointer'
                    />
                </label>

                {/* Errors will return when field validation fails */}
                <div className='flex flex-col p-5'>
                    {errors.name && (
                        <span className='text-red-500'>- Name is required</span>
                    )}

                    {errors.email && (
                        <span className='text-red-500'>- Email is required</span>
                    )}
                </div>

                <input 
                    type="submit" 
                    className='shadow bg-[#2EC4B6] hover:bg-[#5D2E8C] hover:shadow-lg hover:shadow-[#2EC4B6] focus:shadow-outline text-white font-bold py-2 px-4 rounded-lg cursor-pointer' 
                />
            </form>
            )
            }
        </>
    )
}