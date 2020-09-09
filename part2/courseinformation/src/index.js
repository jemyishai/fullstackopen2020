import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Total = ({ parts }) => {
  console.log(parts)
  return(
    <p>total of {parts.reduce((acc,sum)=>acc+sum.exercises,0)} exercises</p>
  )
}

const Part = ({id, className, exercise}) => {
  return (
    <p key={id}>
      {className} {exercise}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
    {
      parts.map(item=>{
        return <Part key={item.id} id={item.id} className={item.name} exercise={item.exercises} />
      })
    }
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <div>
    {
      course.map((item) => (
        <div key={item.id}>
        <Header title={item.name} />
        <Content parts={item.parts} />
        <Total parts={item.parts} />
        </div>
      ))
    }
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))
