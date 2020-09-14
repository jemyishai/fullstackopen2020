import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterTest }) => {
  return (
    <div>
      {persons.filter(filterTest).map((person) => (
        <Person key={person.name+1} person={person} />
      ))}
    </div>
  );
};

export default Persons;
