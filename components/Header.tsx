import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  gap: 5px;
  background-color: gray;
  color: white;
`;

type Props = {
  username?: string;
};

export default function Header(props: Props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          {props.username ? (
            <>Logged in as {props.username} &nbsp;&nbsp;&nbsp;</>
          ) : (
            'Not logged in'
          )}
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a data-cy="header-about-link">About</a>
        </Link>
        <Link href="/about-protected">
          <a>About (protected)</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        <Link href="/users">
          <a>Users</a>
        </Link>
        <Link href="/users-protected">
          <a>Users Protected</a>
        </Link>
        <Link href="/admin/users">
          <a>Admin</a>
        </Link>
        {!props.username && (
          <>
            <Link href="/register">
              <a>Register</a>
            </Link>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        )}

        {props.username && (
          <Link href="/logout">
            <a>Login</a>
          </Link>
        )}
      </nav>
    </header>
  );
}
