import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import jace from '../public/images/jace.png';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>about</title>
      </Head>
      <div>about</div>
      this is the version with image component (RECOMMENDED)
      <Image src={jace} alt="jace" />
    </Layout>
  );
}
