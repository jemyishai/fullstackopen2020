import React from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Total = ({ parts }) => {
  console.log(parts);
  return (
    <p>
      total of {parts.reduce((acc, sum) => acc + sum.exercises, 0)} exercises
    </p>
  );
};

const Part = ({ id, className, exercise }) => {
  return (
    <p key={id}>
      {className} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => {
        return (
          <Part
            key={item.id}
            id={item.id}
            className={item.name}
            exercise={item.exercises}
          />
        );
      })}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      {course.map((item) => (
        <div key={item.id}>
          <Header title={item.name} />
          <Content parts={item.parts} />
          <Total parts={item.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course
