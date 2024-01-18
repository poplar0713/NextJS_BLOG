import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import Layout from '../components/Layout'
import Date from '../components/Date'
import { getSortedPostsData } from '../lib/posts'
// import { getSortedPostsData } from '../lib/posts'
// import { useEffect, useState } from 'react'

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/posts')
//   const json = await response.json()
//
//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   }
// }

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  // // export default function Home() {
  //   const [allPostsData, setAllPostData] = useState([])
  //
  //   useEffect(() => {
  //     fetch('/api/posts')
  //       .then((res) => res.json())
  //       .then((data) => setAllPostData(data.allPostsData))
  //   }, [])

  return (
    <Layout home>
      <h1 className={utilStyles.headingLg}>Hello! Welcome to my blog</h1>
      <p className={utilStyles.headingMd}>This is my sample project</p>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>BLOG</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
