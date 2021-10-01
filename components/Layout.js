import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header greeting={props.greeting} />
      {props.children}
      <Footer />
    </div>
  );
}
