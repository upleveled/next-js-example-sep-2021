import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  gap: 5px;
  background-color: gray;
  color: white;
`;

type Props = {
  greeting?: string;
};

export default function Header(props: Props) {
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
        <Link href="/admin/users">
          <a>Admin</a>
        </Link>
      </nav>
    </header>
  );
}
