import * as types from '../types/ui';

const defaultState = {
  sidebar: {
    collapsed: false,
  },
  redirectLink: null,
};

const ui = (state = defaultState, action: any) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          collapsed: action.payload,
        },
      };

    case types.REDIRECT:
      return {
        ...state,
        redirectLink: action.payload,
      };

    case types.RESET_REDIRECT:
      return {
        ...state,
        redirectLink: null,
      };

    default:
      return state;
  }
};

export default ui;
