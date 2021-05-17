import anecdoteReducer from "./reducers/anecdoteReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore } from "redux";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notice: notificationReducer
})

const store = createStore(reducer, composeWithDevTools());

export default store;
