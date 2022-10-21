import { createSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'app/fuse-configs/navigationConfig';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();
const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = (id) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};

export const {
  selectAll: selectNavigationAll,
  selectIds: selectNavigationIds,
  selectById: selectNavigationItemById,
} = navigationAdapter.getSelectors((state) => state.fuse.navigation);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: navigationAdapter.setAll,
    resetNavigation: (state, action) => initialState,
  },
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = (state) => state.auth.user.role;

export const selectNavigation = createSelector(
  [selectNavigationAll, ({ i18n }) => i18n, getUserRole],
  (navigation, userRole) => {
    return _.merge(
      [],
      FuseUtils.filterRecursive(navigation, (item) => FuseUtils.hasPermission(item.auth, userRole))
    );
  }
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
  FuseUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
