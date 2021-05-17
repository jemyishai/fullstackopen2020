import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOneAction } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addOneAction(id));
  };

  console.log(anecdotes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              <div data-testid={anecdote.content.slice(0, 7).trim()}>
                has {anecdote.votes}
              </div>
              <button
                data-testid={"button-" + anecdote.content.slice(0, 7)}
                onClick={() => vote(anecdote.id)}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
