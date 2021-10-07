import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  gap: 5px;
  background-color: gray;
  color: white;
`;

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>{props.greeting}</div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a data-cy="header-about-link">About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        <Link href="/users">
          <a>Users</a>
        </Link>
      </nav>
    </header>
  );
}
