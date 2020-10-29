import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

/* Component for the NavigationBar */
class NavigationBar extends React.Component {
  render() {
    return (
      <nav className='navbar backgroundBlue'>
        <h1>
          <Link to='/'>
            <i className='fas fa-shopping-cart'></i> Quickart
          </Link>
        </h1>
        <ul>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          <li>
            <Link to='/register'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavigationBar;
