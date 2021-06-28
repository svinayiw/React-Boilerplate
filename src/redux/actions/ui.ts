import * as types from '../types/ui';

export const toggleSidebar = (collapsed: boolean) => (dispatch: any) => {
  dispatch({
    type: types.TOGGLE_SIDEBAR,
    payload: collapsed,
  });
};

export const resetRedirect = () => (dispatch: any) => {
  dispatch({
    type: types.RESET_REDIRECT,
  });
};
