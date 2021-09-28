import { css, Global } from '@emotion/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
