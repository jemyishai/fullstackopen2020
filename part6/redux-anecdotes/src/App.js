import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOneAction, addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addOneAction(id));
  };

  const dispatchAnecdote = (event) => {
    event.preventDefault()
    const saying = event.target.say.value
    event.target.say.value = ''
    console.log(saying);
    dispatch(addAnecdote(saying));
  }
console.log(anecdotes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes-a.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <div data-testid={anecdote.content.slice(0, 7).trim()}>
              has {anecdote.votes}
            </div>
            <button
              data-testid={
                "button-" + anecdote.content.slice(0, 7)
              }
              onClick={() => vote(anecdote.id)}
            >
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={dispatchAnecdote}>
          <input name="say"/>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
