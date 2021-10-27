import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

const formStyles = css`
  label {
    display: block;
  }
`;

const errorsStyles = css`
  color: red;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <h1>Login</h1>

      <form
        css={formStyles}
        onSubmit={async (event) => {
          event.preventDefault();

          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const loginJson = (await loginResponse.json()) as LoginResponse;

          if ('errors' in loginJson) {
            setErrors(loginJson.errors);
            return;
          }

          const destination =
            typeof router.query.returnTo === 'string' && router.query.returnTo
              ? router.query.returnTo
              : `/users/${loginJson.user.id}`;

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

        <button>Login</button>
      </form>

      <div css={errorsStyles}>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}
