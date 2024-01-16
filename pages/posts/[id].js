import Head from 'next/head'
import Layout from '../../components/Layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import CodeBlock from '../../components/CodeBlock'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  // const paths = [
  //   {
  //     params: {
  //       id: 'ssg-ssr',
  //     },
  //   },
  //   // {
  //   //   params: {
  //   //     id: 'pre-rendering',
  //   //   },
  //   // },
  // ]

  return {
    paths,
    fallback: true, // 빌드시 생성되지 않는 Page에 대한 처리
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

const Button = ({ children }) => {
  return (
    <button
      className="text-blue-600 text-lg font-semibold underline dark:text-blue-200"
      onClick={() => {
        alert(children)
      }}
    >
      {children}
    </button>
  )
}

const components = { Button, CodeBlock }

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <article>
        <h1 className="title">{postData.title}</h1>
        <div style={{ fontWeight: 'lighter', color: 'gray' }}>
          <Date dateString={postData.date} />
        </div>
        <br />
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </Layout>
  )
}
