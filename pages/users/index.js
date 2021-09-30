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
              <div>{user.following ? '❤️' : '🖤'}</div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  const cookies = context.req.cookies.following || '[]';
  const following = JSON.parse(cookies);

  console.log(following);
  // [5,7]
  console.log(users);

  const glorifiedUsers = users.map((user) => {
    return {
      ...user,
      following: following.some((id) => {
        return Number(user.id) === id;
      }),
    };
  });

  console.log(glorifiedUsers);

  return {
    props: {
      users: glorifiedUsers,
    },
  };
}
