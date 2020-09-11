import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const submitName = (event) => {
    event.preventDefault();
    if (persons.every((nameCheck) => nameCheck.name !== newName)) {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    } else {
      setNewName("");
      setNewNumber("");
      return alert(`${newName} is already added to phonebook`);
    }
  };

  const onChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const onFilter = (event) => {
    console.log(event.target.value);
    //ensure special character does not break the filter
    const regex = /[^\-a-zA-Z0-9' ]+/gi;
    let filteredInput = event.target.value.replace(regex, "");
    setFilter(filteredInput);
  };

  const filterTest = ({ name }) => {
    console.log(name);
    const filteringNames = new RegExp(filter, "ig");
    return filteringNames.test(name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filter} onChange={onFilter} />
      </div>
      <form onSubmit={submitName}>
        <div>
          <h2>add a new</h2>
          name: <input value={newName} onChange={onChangeName} /> <br />
          number: <input value={newNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.filter(filterTest).map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
