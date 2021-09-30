import Head from 'next/head';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

export default function User(props) {
  // this is to get the url query in the frontend
  // const router = useRouter();
  // const { user } = router.query;

  const [following, setFollowing] = useState(
    getParsedCookie('following') || [],
  );

  console.log(getParsedCookie('following'));

  function clickHandler() {
    // 1. check the current state of the cookie
    const currentCookie = getParsedCookie('following');
    // [5,7]

    const isUserFollowed = currentCookie.some((id) => {
      return id === Number(props.singleUser.id); // id that comes from the URL
    });

    let newCookie;
    if (isUserFollowed) {
      // remove the user
      newCookie = currentCookie.filter(
        (id) => id !== Number(props.singleUser.id),
      );
    } else {
      // add the user
      newCookie = [...currentCookie, Number(props.singleUser.id)];
    }

    console.log(newCookie);

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favourite color is {props.singleUser.favoriteColor}</div>
      <button onClick={clickHandler}>
        {following.some((id) => Number(props.singleUser.id) === id)
          ? 'unfollow'
          : 'follow'}
      </button>
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
