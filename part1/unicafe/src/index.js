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

  if (all === 0) {
    return (
      <>
        <h1>give feedback</h1>
        <Buttons clickEvent={clickEvent} />
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

const Statistic = ({ text, stat, symbol }) => (
  <p>
    {text} {stat} {symbol}
  </p>
);

const Statistics = ({
  sectionHeader,
  good,
  neutral,
  bad,
  clickEvent,
  average,
  all,
  pos,
}) => {
  return (
    <div>
      <h1>{sectionHeader}</h1>

      <Buttons clickEvent={clickEvent} />

      <Statistic text={"good"} stat={good} />
      <Statistic text={"neutral"} stat={neutral} />
      <Statistic text={"bad"} stat={bad} />
      <Statistic text={"average"} stat={average} />
      <Statistic text={"all"} stat={all} />
      <Statistic text={"positive"} stat={pos} symbol={"%"} />
    </div>
  );
};

{/*
  //Need to clean up buttons, Statistics Component, Clicks component, allState storage

   {/*
      <Button handleClick={() => clickEvent("g")} text={"good"} />
      <Button handleClick={() => clickEvent("n")} text={"neutral"} />
      <Button handleClick={() => clickEvent("b")} text={"bad"} />

       <Clicks allState={allState} />

*/}

const Buttons = ({ clickEvent }) => (
  <div>
  {
    [['g','good'],['n','neutral'],['b','bad']].map((arr)=><Button handleClick={() => clickEvent(arr[0])} text={arr[1]} />
  )
  }
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
