import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

export default function Home() {
  const myDarkMode = getLocalStorage('darkMode') || false;

  const [darkMode, setDarkMode] = useState(myDarkMode);

  function clickHandler() {
    const newDarkMode = !getLocalStorage('darkMode');

    setLocalStorage('darkMode', newDarkMode);

    setDarkMode(newDarkMode);
  }

  // 1. Local Storage is string only
  // 2. Local Storage have methods to set remove and get
  // 3. Local Storage values are independent of the browser and the domain

  return (
    <Layout>
      <Head>
        <title>UpLeveled next.js</title>
      </Head>
      <div>Local Storage Test</div>
      <div>dark mode : {JSON.stringify(darkMode)}</div>
      <button onClick={clickHandler}>dark mode</button>
    </Layout>
  );
}
