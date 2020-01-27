/** @format */

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  login: JSON.parse(localStorage.getItem('login'))
};

const types = {
  SET_USER: 'SET_USER',
  SET_LOGIN: 'SET_LOGIN'
};

const reducer = (state = initialState, action) => {
  //console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.SET_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      };
    case types.SET_LOGIN:
      localStorage.setItem('login', JSON.stringify(action.payload));
      return {
        ...state,
        login: action.payload
      };
    default:
      throw new Error('Unexpected action');
  }
};
export { initialState, types, reducer };
