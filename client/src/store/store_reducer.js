export const initial_state = {
  user: null,
  loading: true
};

export const actions = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  UPDATE_USER: 'UPDATE_USER'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return { ...state, loading: !state.loading };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
  }
};

