import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";
import axios from 'axios';
import services from './services/numbers.js';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
  },[])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const reset = () => {
    setNewName("");
    setNewNumber("");
  }

  const submitName = (event) => {
    event.preventDefault();
    if (persons.every((nameCheck) => nameCheck.name !== newName)) {
        services.create({name: newName, number: newNumber})
        .then(setPersons([...persons, { name: newName, number: newNumber }]));
        reset()
    } else {
        reset()
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
