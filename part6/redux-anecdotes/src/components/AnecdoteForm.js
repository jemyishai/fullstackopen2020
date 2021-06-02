import React from "react";
// import { useDispatch } from "react-redux";
import {connect} from 'react-redux';
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const dispatchAnecdote = (event) => {
    event.preventDefault();
    const saying = event.target.say.value;
    event.target.say.value = "";
    // dispatch(addAnecdote(saying));
    // dispatch(setNotification({content:saying},'newSaying', 5));
    props.addAnecdote(saying);
    props.setNotification({content:saying},'newSaying', 5)
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={dispatchAnecdote}>
        <input name="say" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
