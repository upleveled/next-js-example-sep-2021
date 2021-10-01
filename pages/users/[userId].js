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
  // [5,7]
  // [{id: 5, clapCount:13}, {id: 7, clapCount:0} ]

  // const initialClapCount = following.find((cookieObj)=>cookieObj.id === props.singleUser.id).clapCount

  const userCookieObject = following.find(
    (cookieObj) => cookieObj.id === Number(props.singleUser.id),
  );

  const initialClapCount = userCookieObject ? userCookieObject.clapCount : 0;

  const [clapCount, setClapCount] = useState(initialClapCount);

  function followClickHandler() {
    // 1. check the current state of the cookie
    const currentCookie = getParsedCookie('following') || [];
    // [5,7]
    // [{id: 5, clapCount:13}, {id: 7, clapCount:0} ]

    const isUserFollowed = currentCookie.some(
      (cookieObject /* number => object */) => {
        return cookieObject.id === Number(props.singleUser.id); // id that comes from the URL
      },
    );

    let newCookie;
    if (isUserFollowed) {
      // remove the user
      newCookie = currentCookie.filter(
        (cookieObject /* number => object */) =>
          cookieObject.id !== Number(props.singleUser.id),
      );
      setClapCount(0);
    } else {
      // add the userdev

      newCookie = [
        ...currentCookie,
        { id: Number(props.singleUser.id), clapCount: 0 },
      ];
    }

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }

  function clapClickHandler() {
    // add 1 to the clap property
    // 1. get old version of the array
    const currentCookie = getParsedCookie('following') || [];
    // 2. get the object in the array
    const cookieObjFound = currentCookie.find(
      (cookieObj) => cookieObj.id === Number(props.singleUser.id),
    );
    cookieObjFound.clapCount += 1;
    // 3. set the new version of the array
    setParsedCookie('following', currentCookie);
    setClapCount(cookieObjFound.clapCount);
  }

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favourite color is {props.singleUser.favoriteColor}</div>
      <button onClick={followClickHandler}>
        {following.some(
          (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
        )
          ? 'unfollow'
          : 'follow'}
      </button>
      {following.some(
        (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
      ) ? (
        <>
          <div>Clap: {clapCount}</div>
          <button onClick={clapClickHandler}>Clap me</button>
        </>
      ) : null}
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
