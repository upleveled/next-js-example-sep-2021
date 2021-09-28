import Head from 'next/head';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function User(props) {
  // this is to get the url query in the frontend
  // const router = useRouter();
  // const { user } = router.query;

  if (typeof window !== 'undefined') {
    console.log(window.localStorage);
  }

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favourite color is {props.singleUser.favoriteColor}</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  const idFromUrl = context.query.userId; // 6

  const singleUser = users.find((user) => {
    return idFromUrl === user.id;
  });

  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  console.log(singleUser);
  return {
    props: {
      singleUser,
    },
  };
}
