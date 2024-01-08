"use client"

import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { groq } from "next-sanity"
import { useForm, SubmitHandler } from 'react-hook-form'
import PortableText from "react-portable-text"
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { PostBase } from '../../../config/typings'

import Header from '../../components/header'
import Image from 'next/image'
import PostComments from '@/app/components/postComments'


interface Props {
    params: {
      slug: 'string'
    }
  }

interface CommForm {
    _id: string;
    name: string; //name?: string; means the input is not required
    email: string;
    comment: string;
}


async function Post({ params }: Props) {
    const { slug } = params
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, formState: {errors} } = useForm<CommForm>()

    const onSubmit: SubmitHandler<CommForm> = (data) => {
        setSubmitted(true)
    }

    const post = await client.fetch<PostBase>(
        groq`*[_type == 'post' && slug.current == "${slug}"][0]{
            _id,
            _createdAt,
            title,
            author -> {
                name,
                image
            },
            'comments': *[
                _type == 'comment' && post._ref == ^._id && approved == true
            ],
            description,
            mainImage,
            slug,
            body
        }`, { next: { revalidate: 1000 } }
      )

    console.log("Post", post.author)
    
  return (
    <div>
        <img
            src={urlForImage(post.mainImage).url()}
            className='w-full h-40 object-cover'
            alt=''
        />

        <article className='max-w-3xl mx-auto p-5'>
            <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
            <h2 className='text-xl font-light text-gray-500 mb-2'>{post._description}</h2>

            <div className='flex items-center space-x-2'>
                {/* <img 
                    src={urlForImage(post.author.image).url()}
                    className='h-10 w-10 rounded-full' 
                    alt="" 
                /> */}

                <p className='font-extralight text-sm'>
                    Blog post by{''} 
                    <span className='text-green-600'> {post.author.name}</span> - 
                    Published at {new Date(post._createdAt).toLocaleString()}
                </p>
            </div>

            <div className='mt-10'>
                <PortableText
                    className=''
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={post.body}
                    serializers={
                        {
                            h1: (props: any) => (
                                <h1 className='text-2xl font-bold my-5' {...props}/>
                            ),

                            h2: (props: any) => (
                                <h1 className='text-xl font-bold my-5' {...props}/>
                            ),

                            li: ({children}: any) => (
                                <li className='ml-4 list-disc'>{children}</li>
                            ),

                            link: ({href, children}: any) => (
                                <a href={href} className='text-blue-500 hover:underline'>{children}</a>
                            )
                        }
                    }
                />
            </div>
        </article>

        <hr className='max-w-lg my-5 mx-auto border border-yellow-500'/>b

        <PostComments post={post}/>
    </div>
  )
}

export default Post

