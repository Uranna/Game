const getStatus = () => localStorage.getItem('access_token') !== null

const defaultState = {
  isLogin: getStatus(),
  message: '',
  error: '',
  request: {
    type: 1
  },
  response: {}
};

const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const START = "START"
const ANSWER = "ANSWER";
const CLEAR = "CLEAR";
const LOG_OUT = "LOG_OUT";
const UPDATE = "UPDATE";
const TIMER = "TIMER";

export const reducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGIN: {
      if (!payload.status) return { ...state, error: payload.errors };
      if (getStatus()) return { ...defaultState, isLogin: true };
      return { ...defaultState }
    }

    case SIGNUP: {
      if (payload.status) return { ...defaultState, message: payload.data.message };
      if (payload.errors.hasOwnProperty('password')) return { ...state, error: { ...payload.errors, password_confirmation: [''] } };
      return { ...state, error: payload.errors };
    }
    case START:
      return (payload.response.status) ? { ...state, request: payload.request, response: payload.response } : { ...state, error: payload.errors };
    case ANSWER: return (payload.status) ? { ...state, response: payload } : { ...state, error: payload.errors };
    case CLEAR: return { ...defaultState, isLogin: state.isLogin };
    case LOG_OUT: {
      localStorage.removeItem('access_token');
      return { ...defaultState, isLogin: false }
    }
    case UPDATE: {
      delete state.error[payload];
      return { ...state, message: '' }
    }
    case TIMER: return { ...state, response: { ...state.response, data: { ...state.response.data, time: state.response.data.time - 1 } } }
    default: return state;
  }
}

export const loginAction = (payload) => ({ type: LOGIN, payload: payload });
export const signupAction = (payload) => ({ type: SIGNUP, payload: payload });
export const startAction = (payload) => ({ type: START, payload: payload });
export const answerAction = (payload) => ({ type: ANSWER, payload: payload });
export const clearAction = () => ({ type: CLEAR });
export const updateAction = (payload) => ({ type: UPDATE, payload: payload });
export const logoutAction = () => ({ type: LOG_OUT });
export const timerAction = () => ({ type: TIMER })
