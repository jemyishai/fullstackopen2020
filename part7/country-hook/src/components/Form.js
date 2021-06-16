import React, { useState } from "react";
import { MemoizedCountry } from "./Country";

import { useField, useCountry } from "../hooks";

const Form = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");

  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.inputField.value);
    nameInput.reset();
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput.inputField} />
        <button>find</button>
      </form>
      <MemoizedCountry country={country} />
    </div>
  );
};

export default Form;
