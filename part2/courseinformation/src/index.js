import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({key, className, exercise}) => {
  return (
    <p key={key}>
      {className} {exercise}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
    {
      parts.map(item=>{
        return <Part key={item.id} className={item.name} exercise={item.exercises} />
      })
    }
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <Header title={course.name} />
    <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
