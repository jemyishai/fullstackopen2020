import React from "react";

const Anecdote = ({ anecdote }) =>
  anecdote ? (
    <div>
      <h1>{anecdote.content}</h1>
      has {anecdote.votes} votes
    </div>
  ) : (
    "This anecdote doesn't exist"
  );

export default Anecdote;
