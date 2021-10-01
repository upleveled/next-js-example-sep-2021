import Head from 'next/head';
import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout greeting="Hola amigo">
      <Head>
        <title>contact</title>
      </Head>
      <div>contact Me please</div>
      image with normal img tag
      <img src="/jace.png" alt="jace" />
    </Layout>
  );
}
