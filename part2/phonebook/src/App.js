import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";
import services from './services/numbers.js';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
        services.getAll()
        .then(response => {
          setPersons(response)
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
        .then(response => {
         setPersons([...persons, response])
        })
        reset()
    } else {
        let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (result){
          let personObj = persons.find(person=>person.name === newName)
          console.log(personObj)
          services.update(personObj.id, {name: newName, number: newNumber})
          .then(res=>{
            console.log(res)
            setPersons([...persons.filter(person=>person.id!== personObj.id), res])
          })
        }
    }
    reset()
  };

  const deletion = (name) => {
    let result = window.confirm(`Delete ${name} ?`);
    if (result){
        let personObj = persons.find(person=>person.name=== name)
        services.deletePerson(personObj.id)
        .then(res=>{
          console.log('res here',res);
          setPersons(persons.filter(person=>person.id!== personObj.id))
        }
        )
        alert(`${personObj.name} has been deleted`)
    }
  }

  const onChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filterTest = ({ name }) => {
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
      <Persons persons={persons} filterTest={filterTest} deletion={deletion}/>
    </div>
  );
};

export default App;
