import Head from 'next/head'
import Layout from '../../components/Layout'
import Date from '../../components/date'
import { getPostData } from '../../lib/posts'
import { useRouter } from 'next/router' // Add this import

export async function getStaticPaths() {
  // const paths = getAllPostIds()
  const paths = [
    {
      params: {
        id: 'ssg-ssr',
      },
    },
    // {
    //   params: {
    //     id: 'pre-rendering',
    //   },
    // },
  ]

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
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
