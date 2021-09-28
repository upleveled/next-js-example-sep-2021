import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  gap: 5px;
  background-color: gray;
  color: white;
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
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
