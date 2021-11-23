import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import {
  addOrRemoveFromFollowingArray,
  findUserAndIncrementClapCount,
  getParsedCookie,
  setParsedCookie,
} from '../../util/cookies';
import { Course, User } from '../../util/database';
import { Errors } from '../../util/types';

type FollowingItem = { id: number; clapCount: number };

type Props = {
  user?: User;
  courses: Course[];
  errors: Errors;
};

export default function SingleUser(props: Props) {
  // this is to get the url query in the frontend
  // const router = useRouter();
  // const { user } = router.query;

  const [following, setFollowing] = useState<FollowingItem[]>(
    getParsedCookie('following') || [],
  );

  // [5,7]
  // [{id: 5, clapCount:13}, {id: 7, clapCount:0} ]

  // const initialClapCount = following.find((cookieObj)=>cookieObj.id === props.user.id).clapCount

  const userCookieObject = following.find(
    (cookieObj) => cookieObj.id === props.user?.id,
  );

  const initialClapCount = userCookieObject ? userCookieObject.clapCount : 0;

  const [clapCount, setClapCount] = useState(initialClapCount);

  if ('errors' in props) {
    return <div>Error: {props.errors[0].message}</div>;
  }

  if (!props.user) {
    return <div>no user passed</div>;
  }

  function followClickHandler() {
    // 1. check the current state of the cookie
    const followingArray = getParsedCookie('following') || [];
    // [5,7]
    // [{id: 5, clapCount:13}, {id: 7, clapCount:0}]

    const newCookie = addOrRemoveFromFollowingArray(
      followingArray,
      props.user?.id,
      () => setClapCount(0),
    );

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }

  function clapClickHandler() {
    // add 1 to the clap property
    // 1. get old version of the array
    const currentCookie = getParsedCookie('following') || [];
    // 2. get the object in the array
    const updatedUser = findUserAndIncrementClapCount(
      currentCookie,
      props.user?.id,
    );
    // 3. set the new version of the array
    setParsedCookie('following', currentCookie);
    setClapCount(updatedUser.clapCount);
  }

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>

      <div>Personal user page of {props.user.name || props.user.username}</div>

      <div>his/her favourite color is {props.user.favoriteColor}</div>

      <button onClick={followClickHandler}>
        {following.some((cookieObj) => props.user?.id === cookieObj.id)
          ? 'unfollow'
          : 'follow'}
      </button>
      {following.some((cookieObj) => props.user?.id === cookieObj.id) ? (
        <>
          <div>Clap: {clapCount}</div>
          <button onClick={clapClickHandler}>Clap me</button>
        </>
      ) : null}
      <h2>User Courses</h2>
      {props.courses.map((course) => {
        return (
          <div key={`course-${course.id}`}>
            <strong>{course.title}</strong>: {course.description}
          </div>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUser, getCoursesByUserIdAndSessionToken, getUserBySessionToken } =
    await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  // Authorization: Allow only specific user
  const sessionUser = await getUserBySessionToken(sessionToken);

  if (!sessionUser) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?returnTo=${context.req.url}`,
      },
    };
  }

  if (sessionUser.id !== Number(context.query.userId)) {
    return {
      props: {
        errors: [{ message: 'Not allowed' }],
      },
    };
  }

  const user = await getUser(Number(context.query.userId));
  const courses = await getCoursesByUserIdAndSessionToken(
    Number(context.query.userId),
    sessionToken,
  );
  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  return {
    props: {
      user: user,
      courses,
    },
  };
}
