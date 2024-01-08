import Image from 'next/image'
import Link from 'next/link'
import { groq } from "next-sanity"
import { client } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'
import { PostBase, Category } from '../config/typings'
import { PostFilters } from './components/postFilters'
import { ProductSort } from './components/postSort'
import Banner from './components/banner'
import ContactForm from './components/contact'

interface Props {
  searchParams: {
    date?: "string",
    category?: "string",
  }
}

export default async function Home({ searchParams }: Props) {
  const { date='desc', category } = searchParams

  const postFilter = `_type == 'post'`
  const categoryFilter = category ? `&& "${category}" in categories` : ""
  const filter = `*[${postFilter} ${categoryFilter}]`
  const dateOrder = date 
    ? `| order(_createdAt ${date})`
    : ''


  const posts = await client.fetch<PostBase[]>(
    groq`${filter} ${dateOrder} {
      _id,
      title,
      description,
      mainImage,
      slug,
      categories,
      author -> {
        name,
        image
      }
    }`, { next: { revalidate: 1000 } }
  )

  console.log(posts)

  const categories = await client.fetch<Category[]>(
    groq`*[_type == 'category']{
      _id,
      title,
      description,
    }`
  )

  return (
    <>
    <div className='max-w-7xl mx-auto'>
      <Banner />
    </div>
    <div className='max-w-7xl mx-auto flex mt-24'>
      <div className='w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((item) => (
          <Link
            key={item._id}
            href={`/post/${item.slug.current}`}
          >
            <div className='border border-[#CCFF66] rounded-lg group cursor-pointer overflow-hidden'>
              <img
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                src={urlForImage(item?.mainImage).url()}
                alt="alt"
              />

              <div className='flex justify-between p-5 bg-[#2EC4B6]'>
                <div>
                  <p className='text-lg font-bold'>{item.title}</p>
                  <p className='text-xs text-[#CCFF66]'>{item._description} by {item.author.name}</p>
                </div>

                <img
                  className='h-12 w-12 rounded-full'
                  src={urlForImage(item.author.image).url()}
                  alt=''
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-[30%] mt-6">
        <div>
          <ProductSort />
          <PostFilters categories={categories}/>
        </div>
      </div>
    </div>
    <div className='mt-24'>
      <ContactForm />
    </div>
    </>
  )
}