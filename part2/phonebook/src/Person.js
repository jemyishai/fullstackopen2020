import React from "react";

const Person = ({ person, deletion }) => (
  <div key={person.name}>
    {person.name} {person.number} <button onClick={()=>deletion(person.name)}>delete</button>
  </div>
);

export default Person;
