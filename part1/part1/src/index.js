import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  console.log('test')
  return (

    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )

}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="George" age = {26+10}/>
      <Hello name="Daisy" age={age}/>
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
