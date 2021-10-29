import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { RegisterResponse } from './api/register';

const formStyles = css`
  label {
    display: block;
  }
`;

const errorsStyles = css`
  color: red;
`;

export default function RegisterPage(props: { refreshUsername: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <h1>Register</h1>

      <form
        css={formStyles}
        onSubmit={async (event) => {
          event.preventDefault();

          const registerResponse = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const registerJson =
            (await registerResponse.json()) as RegisterResponse;

          if ('errors' in registerJson) {
            setErrors(registerJson.errors);
            return;
          }

          const destination =
            typeof router.query.returnTo === 'string' && router.query.returnTo
              ? router.query.returnTo
              : `/users/${registerJson.user.id}`;

          props.refreshUsername();

          router.push(destination);
        }}
      >
        <label>
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>

        <button>Register</button>
      </form>

      <div css={errorsStyles}>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');
  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
