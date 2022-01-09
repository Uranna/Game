import { loginAction, signupAction, startAction, answerAction } from "./reducer";

const urlSignup = 'https://internsapi.public.osora.ru/api/auth/signup';
const urlLogin = 'https://internsapi.public.osora.ru/api/auth/login';
const urlGame = 'https://internsapi.public.osora.ru/api/game/play';


export const fetchLogin = (user) => {
  return function (dispatch) {
    fetch(urlLogin, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status) localStorage.setItem('access_token', json.data.access_token);
        dispatch(loginAction(json));
      })
  }
}

export const fetchSignup = (user) => {
  return function (dispatch) {
    fetch(urlSignup, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        dispatch(signupAction(json))
      })
  }
}

export const fetchGame = (data) => {
  return function (dispatch) {
    fetch(urlGame, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        (data.type === 1) ? dispatch(startAction({ request: { ...data, type: 2 }, response: json })) : dispatch(answerAction(json))
      })
  }
}
