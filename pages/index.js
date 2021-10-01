import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const buttonDark = (darkMode) => {
  return css`
    background-color: ${darkMode ? 'black' : 'beige'};
    color: ${darkMode ? 'white' : 'black'};
  `;
};

// [4,5,6,7]

// [{id: 4, clapCount: 0},{id: 6, clapCount:2}]

export default function Home() {
  const myDarkMode = getLocalStorage('darkMode') || false;

  const [darkMode, setDarkMode] = useState(myDarkMode);

  function clickHandler() {
    const newDarkMode = !getLocalStorage('darkMode');

    setLocalStorage('darkMode', newDarkMode);

    setDarkMode(newDarkMode);
  }

  const greeting = 'Hello';

  // 1. Local Storage is string only
  // 2. Local Storage have methods to set remove and get
  // 3. Local Storage values are independent of the browser and the domain

  return (
    <Layout greeting={greeting}>
      <Head>
        <title>UpLeveled next.js</title>
      </Head>
      <div>Local Storage Test</div>
      <div>dark mode : {JSON.stringify(darkMode)}</div>
      <button css={buttonDark(darkMode)} onClick={clickHandler}>
        dark mode
      </button>
    </Layout>
  );
}
