import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function Contact(props: { username: string | undefined }) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>contact</title>
      </Head>
      <div>contact Me please</div>
      image with normal img tag
      <img src="/jace.png" alt="jace" />
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
        destination: '/login?returnTo=/contact',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
