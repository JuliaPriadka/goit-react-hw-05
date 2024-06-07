import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import css from '../Navigation/Navigation.module.css';

function navClassName({ isActive }) {
  return clsx(css.link, isActive && css.isActive);
}

export default function Navigation() {
  return (
    <ul className={css.navigation}>
      <NavLink to="/" className={navClassName}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navClassName}>
        Movies
      </NavLink>
    </ul>
  );
}
