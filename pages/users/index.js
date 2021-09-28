import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Users(props) {
  return (
    <Layout>
      <Head>
        <title>users</title>
      </Head>
      <h2>Users List</h2>
      <ul>
        {props.users.map((user) => {
          return (
            <li key={`user-li-${user.id}`}>
              {user.name}:
              <Link href={`/users/${user.id}`}>
                <a>{user.name} single page</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { users } = await import('../../util/database');

  console.log(users);
  return {
    props: {
      users,
    },
  };
}
