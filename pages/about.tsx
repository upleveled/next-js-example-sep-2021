import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import jace from '../public/images/jace.png';

export default function About(props: { username: string | undefined }) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>about</title>
      </Head>
      <div>about</div>
      this is the version with image component (RECOMMENDED)
      <Image src={jace} alt="jace" />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/login?returnTo=/about',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
