import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterTest, deletion }) => {
  return (
    <div>
      {persons.filter(filterTest).map((person) => (
        <Person key={person.name+1} person={person} deletion={deletion}/>
      ))}
    </div>
  );
};

export default Persons;
