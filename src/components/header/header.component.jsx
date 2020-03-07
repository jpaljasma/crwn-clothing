import React from 'react';
import { Link } from 'react-router-dom';
// Connect is a HOC - higher-order component that wraps our current component to give it super powers
import { connect } from 'react-redux';
import { ReactComponent as Logo } from './../../assets/crown.svg';
import { auth } from './../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo alt='Crown Logo' className='logo' />
    </Link>

    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/contact'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// can be anything but mapStateToProps is standard with redux codebases
// state - a root reducer
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

// connect(state)(component)
export default connect(mapStateToProps)(Header);
