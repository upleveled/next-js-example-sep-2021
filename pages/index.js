import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>UpLeveled next.js</title>
      </Head>
      <div>Home</div>
      <div>p1</div>
      <div>p2</div>
      <div>p3</div>
    </Layout>
  );
}
