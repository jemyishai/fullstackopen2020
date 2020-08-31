import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
);

const Content = (props) => (
  <>
    <Part part={props.part1} exercise={props.exercise1} />
    <Part part={props.part2} exercise={props.exercise2} />
    <Part part={props.part3} exercise={props.exercise3} />
  </>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises3: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
