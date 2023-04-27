import Head from 'next/head'
import { Inter } from 'next/font/google'
import { GraphQLClient, gql } from 'graphql-request'
import { ENDPOINT, HYGRAPH_TOKEN } from '@/config'
import BlogCard from '@/components/BlogCard'

const inter = Inter({ subsets: ['latin'] })

const graphQLClient = new GraphQLClient(ENDPOINT)
graphQLClient.setHeader('authorization', HYGRAPH_TOKEN)
const QUERY = gql`
  {
    posts {
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
export async function getStaticProps() {
  const { posts }: any = await graphQLClient.request(QUERY)
  return {
    props: { posts },
    revalidate: 30,
  }
}

export default function Home({ posts }: any) {
  console.log(posts)
  return (
    <>
      <Head>
        <title>Bloggy</title>
        <meta name='description' content='blog app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-auto max-w-screen-xl p-6'>
        <div className=''>
          {' '}
          <h1 className='m-10 text-6xl font-bold'>Bloggy</h1>
        </div>
        {posts?.map((p: any) => (
          <div
            className='grid grid-cols-12 m-4 bg-gray-700 rounded-lg'
            key={p.id}
          >
            <BlogCard post={p} />
          </div>
        ))}
      </main>
    </>
  )
}
