import React from "react";

const Form = ({ onSubmit, inputFields }) => {
  let keylabel = Object.keys(inputFields);
  return (
    <form onSubmit={onSubmit}>
      {keylabel.map((keys) => {
        return (
          <p key={keys + 1}>
            {" "}
            {keys} <input {...inputFields[keys]} />
          </p>
        );
      })}
      <button>create</button>
    </form>
  );
};

export default Form;
