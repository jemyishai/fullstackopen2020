import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(()=>anecdotes.map(()=>0));
//when its callback to function it only runs upon initial load

  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  const clickEvent = () => setSelected(getRandomInt(anecdotes.length));

  const clickEventVote = () => {
    let copy = [...votes];
    copy[selected] += 1;
    return setVotes(copy);
  };

  const max = () => Math.max(...votes);

  const mostVotes = () => {
    let indexOfMax = votes.indexOf(max());
    return anecdotes[indexOfMax];
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <button onClick={clickEvent}> next anecdote </button>
      <button onClick={clickEventVote} >vote </button>
      <MostVotes max={max()} mostVotes={mostVotes()} />
    </div>
  );
};

const MostVotes = ({ max, mostVotes }) => (
  <>
    <h1>Anecdote with Most Votes</h1>
    {mostVotes} <br />
    has {max} votes
  </>
);


const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
