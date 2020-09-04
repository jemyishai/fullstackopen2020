import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const pos = (100 * good) / all;

  const allState = [{ good: good }, { neutral: neutral }, { bad: bad }];



  const clickEvent = (event) => {
    if (event === "g") {
      setGood(good + 1);
    } else if (event === "n") {
      setNeutral(neutral + 1);
    } else if (event === "b") {
      setBad(bad + 1);
    }
  };
  if (all === 0){
    return (
      <>
        <h1>give feedback</h1>
        <Button
        handleClick={() => clickEvent("g")}
        text={"good"}
        clickEvent={clickEvent}
      />
      <Button
        handleClick={() => clickEvent("n")}
        text={"neutral"}
        clickEvent={clickEvent}
      />
      <Button
        handleClick={() => clickEvent("b")}
        text={"bad"}
        clickEvent={clickEvent}
      />
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>give feedback</h1>
        <Statistics
          sectionHeader="statistics"
          clickEvent={clickEvent}
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          all={all}
          pos={pos}
        />
      </>
    );
  }
};

const Clicks = ({ allState }) => {
  console.log(allState);
  return (
    <>
      {allState.map((obj) => {
        for (const aProp in obj) {
          return <p key={aProp + 1}> {aProp + " " + obj[aProp]} </p>;
        }
      })}
    </>
  );
};

const Statistic = ({ text, stat , symbol }) => <p>{text}{" "}{stat}{" "}{symbol}</p>;


const Statistics = ({ sectionHeader, good, neutral, bad, clickEvent, average, all, pos }) => {
  return (
    <div>
      <h1>{sectionHeader}</h1>
      <Button
        handleClick={() => clickEvent("g")}
        text={"good"}
        clickEvent={clickEvent}
      />
      <Button
        handleClick={() => clickEvent("n")}
        text={"neutral"}
        clickEvent={clickEvent}
      />
      <Button
        handleClick={() => clickEvent("b")}
        text={"bad"}
        clickEvent={clickEvent}
      />

     {/* <Clicks allState={allState} /> */}
      <Statistic text={'good'} stat={good} />
      <Statistic text={'neutral'} stat={neutral} />
      <Statistic text={'bad'} stat={bad} />
      <Statistic text={'average'} stat={average} />
      <Statistic text={'all'} stat={all} />
      <Statistic text={'positive'} stat={pos} symbol={'%'}/>
    </div>
  );
};

{/*
  //Need to clean up buttons, Statistics Component, Clicks component, allState storage

  const Buttons = () => (
  <Button handle
)
*/}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
