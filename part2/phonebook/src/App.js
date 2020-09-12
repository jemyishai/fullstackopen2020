import React, { useState } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";

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

  const filterTest = ({ name }) => {
    console.log(name);
    const filteringNames = new RegExp(filter, "ig");
    return filteringNames.test(name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        onSubmit={submitName}
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filterTest={filterTest} />
    </div>
  );
};

export default App;
