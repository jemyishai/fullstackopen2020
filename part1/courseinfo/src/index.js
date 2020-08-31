import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Part = (props) => (
  <p key={props.keys}>
    {props.part} {props.exercise}
  </p>
);

const Content = (props) => (
  <>
    {props.parts.map((item) => (
      <Part key={item.name + 1} part={item.name} exercise={item.exercises} />
    ))}
  </>
);

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0
    )}
  </p>
);

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
