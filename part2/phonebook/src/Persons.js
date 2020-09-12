import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterTest }) => {
  return (
    <div>
      {persons.filter(filterTest).map((person) => (
        <Person person={person} />
      ))}
    </div>
  );
};

export default Persons;
