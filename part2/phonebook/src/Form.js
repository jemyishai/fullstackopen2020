import React from "react";

const Form = ({onSubmit, valueName, valueNumber, onChangeName, onChangeNumber}) => {

  return (
    <form onSubmit={onSubmit}>
    <div>
      <h2>add a new</h2>
      name: <input value={valueName} onChange={onChangeName} /> <br />
      number: <input value={valueNumber} onChange={onChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  )
}

export default Form

