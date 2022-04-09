import './styles.css';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { useLocation } from 'react-router-dom';

const onClick = () => {
  console.log('HICE UN CLIC');
};

const links = ['/', '/contacto'];

const checkActiveRoute = (activeRoute: string): any[] => {
  return links.map((link) => {
    return link === activeRoute ? 'clicked' : 'primary';
  });
};

const NavBar = () => {
  const location = useLocation();
  const variants = checkActiveRoute(location.pathname);
  return (
    <div className="navBarContainer">
      <Link to={links[0]} style={{ padding: 5 }}>
        <Button
          onClick={onClick}
          text={'INICIO'}
          variant={variants[0]}
        ></Button>
      </Link>
      <Link to={links[1]} style={{ padding: 5 }}>
        <Button
          onClick={() => {}}
          text={'CONTACTO'}
          variant={variants[1]}
        ></Button>
      </Link>
    </div>
  );
};

export default NavBar;
