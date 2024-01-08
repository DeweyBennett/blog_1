"use client"

import { PostBase } from "@/config/typings";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'

interface Props {
    post: PostBase
}

interface CommForm {
    _id: string;
    name: string; //name?: string; means the input is not required
    email: string;
    comment: string;
}

export default function PostComments( { post }: Props) {
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, formState: {errors} } = useForm<CommForm>()

    const onSubmit: SubmitHandler<CommForm> = (data) => {
        fetch("/api/createComment",{
            method: 'POST',
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data)
            setSubmitted(true)
        }).catch((err) => {
            console.log(err)
            setSubmitted(false)
        })
    }

    return(
        <>
            {submitted ? 
            (
                <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
                    <h3 className='text-3xl font-bold'>
                        Thank you for submitting your comment!
                    </h3>
                    <p>Once it has been approved, it will appear below</p>
                </div>
            )
            :

            (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
                <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
                <h4 className='text-3xl font-bold'>Leave a comment below!</h4>

                <hr className='py-3 mt-2'/>

                <input 
                    {...register("_id")}
                    type="hidden"
                    name='_id'
                    value={post._id}
                />

                <label className='block mb-5'>
                    <span className='text-gray-500'>Name</span>
                    <input 
                        {...register("name", { required: true })}
                        type="text" 
                        placeholder='Your Name'
                        className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    />
                </label>

                <label className='block mb-5'>
                    <span className='text-gray-500'>Email</span>
                    <input 
                        {...register("email", { required: true })}
                        type="email" 
                        placeholder='Your Email'
                        className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    />
                </label>

                <label className='block mb-5'>
                    <span className='text-gray-500'>Comment</span>
                    <textarea 
                        {...register("comment", { required: true })}
                        rows={8} 
                        placeholder='Enter Comment'
                        className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring'
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

                    {errors.comment && (
                        <span className='text-red-500'>- Comment is required</span>
                    )}
                </div>

                <input 
                    type="submit" 
                    className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline text-white font-bold py-2 px-4 rounded cursor-pointer' 
                />
            </form>
            )
            }

            <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
                <h3 className="text-4xl">Comments</h3>
                <hr className='pb-2' />

                {post.comments.map((item) => (
                    <div key={item._id}>
                        <p>
                            <span className='text-yellow-500'>{item.name}: </span>
                            {item.comment}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}