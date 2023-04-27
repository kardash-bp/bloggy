import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ post }: any) => {
  return (
    <>
      <div className='col-span-full lg:col-span-5'>
        {post.images?.url && (
          <img src={post.images.url} alt='cover photo' className='' />
        )}
      </div>
      <div className='flex flex-col p-4 col-span-full row-span-full md:col-span-7 md:p-6'>
        <h1 className='mb-4 text-3xl font-semibold'>{post.title}</h1>
        <div className='flex items-center justify-between pt-2'>
          <div className='flex space-x-2'>
            {post.author.avatar ? (
              <Image
                src={post.author.avatar.url}
                alt='author avatar'
                width={30}
                height={30}
              />
            ) : (
              '/no-img.jpg'
            )}
            <span className='self-center text-sm'>by {post.name}</span>
          </div>
          <span className='text-xs'>
            {/* {new Date(post.datePublished).toLocaleDateString('sr-RS', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} */}
            {new Date(post.datePublished).toLocaleTimeString('sr-RS', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <p className='py-4'>{post.content.text.split('.')[0]}...</p>
        <Link
          rel='noopener noreferrer'
          href={`/post/${post.slug}`}
          className='inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-green-400'
        >
          <span>Read more</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-4 h-4'
          >
            <path
              fillRule='evenodd'
              d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </Link>
      </div>
    </>
  )
}

export default BlogCard
