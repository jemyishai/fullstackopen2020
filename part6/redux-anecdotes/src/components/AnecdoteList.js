import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOneAction } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "../components/Notification";
import Filter from "../components/Filter";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter_text = useSelector((state) => state.filter);
  const dispatch = useDispatch();


  const vote = (id) => {
    const anecdoteToBeUpdated = anecdotes.find(obj => obj.id === id)
    console.log(anecdoteToBeUpdated)
    dispatch(addOneAction(id, anecdoteToBeUpdated))
    dispatch(setNotification({content: anecdoteToBeUpdated.content},"upvote", 5));
  };

  const regex = new RegExp(filter_text, "i", "g");

  const filteredAnecdotes = anecdotes.filter((sayingObjects) => {
    if (sayingObjects.content.search(regex) > -1) return sayingObjects;
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {[...filteredAnecdotes]
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
