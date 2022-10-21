/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';

export const setUserData = (user) => async (dispatch, getState) => {
  /*
        You can redirect the logged-in user to a specific route depending on his role
         */

  history.push({
    pathname: '/example',
  });

  /*
    Set User Settings
     */
  dispatch(
    setDefaultSettings({
      layout: {
        style: 'layout1',
        config: {
          scroll: 'content',
          navbar: {
            display: true,
            folded: true,
            position: 'left',
          },
          toolbar: {
            display: true,
            style: 'fixed',
            position: 'below',
          },
          footer: {
            display: true,
            style: 'fixed',
            position: 'below',
          },
          mode: 'fullwidth',
        },
      },
      customScrollbars: true,
      theme: {
        main: 'defaultDark',
        navbar: 'defaultDark',
        toolbar: 'defaultDark',
        footer: 'defaultDark',
      },
    })
  );

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  switch (user.from) {
    default: {
      jwtService.logout();
    }
  }

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }
  switch (user.from) {
    default: {
      jwtService
        .updateUserData(user)
        .then(() => {
          dispatch(showMessage({ message: 'User data saved with api' }));
        })
        .catch((error) => {
          dispatch(showMessage({ message: error.message }));
        });
      break;
    }
  }
};

const initialState = {
  role: [], // guest
  firstName: 'Guest',
  photoURL: '',
  email: '',
  shortcuts: [],

};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
