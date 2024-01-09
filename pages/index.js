import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import Link from 'next/link'
import Image from 'next/image'
// import { getSortedPostsData } from '../lib/posts'
// import { useEffect, useState } from 'react'

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts')
    const json = await response.json()

  return {
    props: {
      allPostsData: json.allPostsData,
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
    <div className={styles.container}>
      <Head>
        <title>BLOG Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/*<img src="/images/profile.jpg" alt="dong"/>*/}
        <Image
          src="/images/profile.jpg"
          alt="dong"
          style={{ borderRadius: 400 }}
          width={140}
          height={140}
        />
        <h1 className={styles.title}>Hello! Welcome to my blog</h1>

        <p className={styles.description}>This is my sample project</p>
        {/*<p>*/}
        {/*  <Link href="/posts/first-post">first post</Link>*/}
        {/*</p>*/}
      </main>

      <section>
        <h2 className={styles.sectionTitle}>Blog</h2>
        <ul className={styles.customList}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
