import Head from 'next/head'
import Layout from '../../commponents/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData }) {
  return (
    <Layout>
        {postData.title}
        <br/>
        {postData.id}
        <br/>
        {postData.data}
    </Layout>
  )
}