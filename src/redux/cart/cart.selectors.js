import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// memoized selector for all our cart items
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// cart items count
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

// total amount in cart
export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedTotal, cartItem) =>
        accumulatedTotal + cartItem.quantity * cartItem.price,
      0
    )
);

// cart hidden
export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);