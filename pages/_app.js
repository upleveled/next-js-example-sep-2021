import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState();

  const refreshUsername = useCallback(async () => {
    const response = await fetch('/api/profile');
    const profile = await response.json();

    console.log(profile);
    if ('errors' in profile) {
      console.log(profile.errors);
      return;
    }
    setUsername(profile.user.username);
  }, []);

  useEffect(() => {
    refreshUsername();
  }, [refreshUsername]);

  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          body {
            margin: 0;
          }
        `}
      />
      <Head>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Component
        {...pageProps}
        username={username}
        refreshUsername={refreshUsername}
      />
    </>
  );
}
