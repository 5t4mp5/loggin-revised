import {createStore, applyMiddleware, combineReducers} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from "axios";

const SET_USER =  "SET_USER";

const setUser = user => ({
  type: SET_USER,
  user
});

export const sessionLogin = () => {
  return dispatch => {
    return axios.get("/auth")
      .then(response => response.data)
      .then(user => dispatch(setUser(user)))
  }
}

export const loginThunk = user => {
  return dispatch => {
    return axios.post("/auth", user)
      .then(response => response.data)
      .then(user => dispatch(setUser(user)))
  }
}

export const logoutThunk = () => {
  return dispatch => {
    return axios.delete("/auth")
      .then(() => dispatch(setUser({})))
  }
}

const userReducer = (state = {  }, action) => {
  switch(action.type){
    case SET_USER:
    return action.user
  }
  return state;
}

const reducer = combineReducers({
  user: userReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
