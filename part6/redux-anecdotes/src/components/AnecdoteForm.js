import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { newSayingAction } from "../reducers/notificationReducer";
import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const dispatchAnecdote = (event) => {
    event.preventDefault()
    const saying = event.target.say.value
    event.target.say.value = ''
    console.log(saying);
    anecdoteServices.create(saying).then((saying)=>{
      console.log('after',saying);
      dispatch(addAnecdote(saying))
      dispatch(newSayingAction(saying.content))
    })
  }
console.log(anecdotes)

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={dispatchAnecdote}>
          <input name="say"/>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
