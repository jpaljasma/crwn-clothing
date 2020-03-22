import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from './../../redux/cart/cart.actions';

import {
  selectCartItemsCount,
  selectCartItemsTotal
} from './../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from './../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount, cartTotal }) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span
        className='item-count'
        title={`${cartTotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol'
        })}`}
      >
        {itemCount}
      </span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartTotal: selectCartItemsTotal
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
