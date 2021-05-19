import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, waitFor, fireEvent, getByTestId } from "@testing-library/react";
import deepFreeze from "deep-freeze";
import reducer, { initialState, anecdotesAtStart } from "./anecdoteReducer";
import App from "../App";
import store from '../store'
import anecdoteServices from './services/anecdotes.js'

describe("reducer", () => {
  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = reducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("use of addOneAction action incrementes anecdote vote", () => {
    //pick a random anecdote
    const getRandomNumber = () => (100000 * Math.random()).toFixed(0);
    const randomForTest = () => {
      let randomNumber = getRandomNumber();
      while (randomNumber < 0 || randomNumber > 4) {
        randomNumber = getRandomNumber();
      }
      return randomNumber;
    };
    let randomAnecdoteIndex = randomForTest();
    console.log({ randomAnecdoteIndex });

    const anAnecdote = initialState[randomAnecdoteIndex];

    const action = {
      type: "ADD_ONE",
      id: anAnecdote.id,
    };

    const state = initialState;

    deepFreeze(state);
    const newState = reducer(state, action);
    expect(newState[randomAnecdoteIndex].votes).toEqual(1);
  });

  // test('when vote is clicked, addOneAction is dispatched  with voting id', ()=>{

  // })
});

describe("redux state and action are used for voting", () => {
  // Hoist helper functions (but not vars) to reuse between test cases

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  it("renders initial anecdotes", async () => {
    // Render new instance in every test to prevent leaking state
    const { getByText } = renderComponent();

    await waitFor(() => getByText(/Any fool can write code that a computer can understand. Good programmers write code that humans can understand./i));
    await waitFor(() =>
      getByText(/Premature optimization is the root of all evil./i)
    );
  });

  it("increments votes", async () => {
    // Render new instance in every test to prevent leaking state
    const { getByText, getByTestId } = renderComponent();

    fireEvent.click(getByTestId("button-Prematu"));
    await waitFor(() => getByText(/has 1/i));
  });
});
