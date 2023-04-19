import { useContext, useEffect, useState } from 'react';
import { MeetupsContext } from '../../context/MeetupsContext';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  const meetups = useContext(MeetupsContext);
  const favoriteMeetupsCount = meetups.filter(
    (meetup) => meetup.isFavorite
  ).length;

  const scrollDirection = useScrollDirection();

  return (
    <header
      className={classNames(
        classes.header,
        scrollDirection === 'down' ? classes.hide : ''
      )}
      data-test='navigation-header'
    >
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classNames(classes.active) : ''
              }
            >
              All Meetups
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/new-meetup'
              className={({ isActive }) =>
                isActive ? classNames(classes.active) : ''
              }
            >
              Add New Meetup
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/favorites'
              className={({ isActive }) =>
                isActive ? classNames(classes.active) : ''
              }
            >
              My Favorites
              <span className={classes.badge}>{favoriteMeetupsCount}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let previousScrollPosition = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const newDirection =
        previousScrollPosition > currentScrollPosition ? 'up' : 'down';
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }
      previousScrollPosition =
        currentScrollPosition > 0 ? currentScrollPosition : 0;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  return scrollDirection;
}
