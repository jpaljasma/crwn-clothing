import { createSelector } from 'reselect';

// input selector
const selectUser = state => state.user;

// memoized selector for all our cart items
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
