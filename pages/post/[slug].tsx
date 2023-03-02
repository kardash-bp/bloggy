import Head from 'next/head'
import { Inter } from 'next/font/google'
import { GraphQLClient, gql } from 'graphql-request'
import { ENDPOINT, HYGRAPH_TOKEN } from '@/config'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

const graphQLClient = new GraphQLClient(ENDPOINT)
graphQLClient.setHeader('authorization', HYGRAPH_TOKEN)
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      content {
        text
      }
      author {
        name
        avatar {
          url
        }
      }
      images {
        id
        url
      }
    }
  }
`
const SLUG_LIST = gql`
  {
    posts {
      slug
    }
  }
`
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { posts } = (await graphQLClient.request(SLUG_LIST)) as any

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
export async function getStaticProps({ params }: any) {
  const { slug } = params
  console.log(slug)
  const { post }: any = await graphQLClient.request(QUERY, { slug })
  return {
    props: { post },
    revalidate: 30,
  }
}

const Post = ({ post }: any) => {
  console.log(post)
  return (
    <article className='relative max-w-4xl px-6 py-14 mx-auto space-y-16 dark:bg-gray-800 dark:text-gray-50'>
      <div className='absolute inset-x-0 top-0 h-[240px] overflow-hidden'>
        <img
          src={post.images.url}
          alt='cover img'
          className='w-full h-[240px] object-cover'
        />
      </div>
      <div className='w-full mx-auto pt-[140px]'>
        <h1 className='text-5xl font-bold leading-none'>{post.title}</h1>
        <div className='flex flex-wrap space-x-2 text-sm dark:text-gray-400'>
          <a rel='noopener noreferrer' href='#' className='p-1 hover:underline'>
            #MambaUI
          </a>
          <a rel='noopener noreferrer' href='#' className='p-1 hover:underline'>
            #TailwindCSS
          </a>
          <a rel='noopener noreferrer' href='#' className='p-1 hover:underline'>
            #Next.js
          </a>
        </div>
        <p className='flex items-center text-sm dark:text-gray-400'>
          by
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-2 flex gap-2 items-center hover:underline dark:text-green-400'
          >
            {' '}
            {post.author.avatar ? (
              <Image
                src={post.author.avatar.url}
                alt='author avatar'
                width={30}
                height={30}
              />
            ) : (
              <Image
                src='/no-img.jpg'
                alt='author avatar'
                width={30}
                height={30}
              />
            )}
            <span> {post.author.name.toUpperCase()} </span>
          </a>
          on
          <span className='ml-2 text-xs'>
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
        </p>
      </div>
      <div>
        <p>{post.content.text}</p>
      </div>
    </article>
  )
}

export default Post
