import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");
  const history = useHistory();

  const resetForm = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.inputField.value,
      author: author.inputField.value,
      info: info.inputField.value,
      votes: 0,
    });
    setNotification(`a new anecdote ${content.inputField.value}`);
    resetForm();
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputField} />
        </div>
        <div>
          author
          <input {...author.inputField} />
        </div>
        <div>
          url for more info
          <input {...info.inputField} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
