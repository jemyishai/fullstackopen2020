import React, { useState } from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import Menu from "./Menu";
import Footer from "./Footer";
import About from "./About";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import Anecdote from "./Anecdote";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const padding = {
    paddingRight: 5,
  };

  const match = useRouteMatch("/anecdote/:id");
  const matchedAnecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />
      <Switch>
        <Route exact path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/anecdote/:id">
          <Anecdote anecdote={matchedAnecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
