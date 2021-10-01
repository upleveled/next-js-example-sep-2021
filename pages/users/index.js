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
  // [{id: 5, clapCount:13}, {id: 7, clapCount:0} ]
  console.log(users);

  const glorifiedUsers = users.map((user) => {
    const isTheUserFollowed = following.some((userCookieObj /* object */) => {
      return Number(user.id) === userCookieObj.id;
    });

    const userObj = following.find((cookieObj) => {
      return cookieObj.id === Number(user.id);
    });

    return {
      ...user,
      following: isTheUserFollowed,
      clap: isTheUserFollowed ? userObj.clapCount : 0,
    };
  });

  // { id: '4', name: 'Ines', favoriteColor: 'yellow', following: true }
  // { id: '4', name: 'Ines', favoriteColor: 'yellow', following: false, clap: 0 }

  // { id: '5', name: 'Lucas', favoriteColor: 'yellow', following: true }
  // { id: '5', name: 'Lucas', favoriteColor: 'yellow', following: true, clap: 13 }

  console.log(glorifiedUsers);

  return {
    props: {
      users: glorifiedUsers,
    },
  };
}
