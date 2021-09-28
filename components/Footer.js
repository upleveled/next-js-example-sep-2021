import { css } from '@emotion/react';

const footerStyles = css`
  display: flex;
  gap: 5px;
  background-color: beige;
  color: black;
`;

export default function Footer() {
  return <footer css={footerStyles}>my-nice-next-page.com</footer>;
}
