import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  greeting?: string;
  // Only if you're using props.children
  children: ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div>
      <Header greeting={props.greeting} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
