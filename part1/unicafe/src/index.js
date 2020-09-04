import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allState = [{ good: good }, { neutral: neutral }, { bad: bad }];

  const all = good + neutral + bad;
  const average = ((good*1) + (neutral*0) + (bad*-1))/all;
  const pos = 100*good/all;

  const clickEvent = (event) => {
    if (event === "g") {
      setGood(good + 1);
    } else if (event === "n") {
      setNeutral(neutral + 1);
    } else if (event === "b") {
      setBad(bad + 1);
    }
  };

  return (
    <>
      <h1>give feedback</h1>
      <Stats
        sectionHeader="statistics"
        allState={allState}
        clickEvent={clickEvent}
        average={average}
        all={all}
        pos={pos}
      />
    </>
  );
};

const Clicks = ({ allState }) => {
  console.log(allState);
  return (
    <>
      {allState.map((obj) => {
        for (const aProp in obj) {
          return <p key={aProp + 1}>  {aProp + " " + obj[aProp]} </p>;
        }
      })}
    </>
  );
};

const All = ({allNum}) => (
  <>
   all {allNum}
  </>
)

const Average = ({average}) => (
  <div>
    average {average}
  </div>
)

const Pos = ({pos}) => (
  <div>
  pos {pos} %
  </div>
)

const Stats = ({ sectionHeader, allState, clickEvent, average, all, pos }) => {
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

      <Clicks allState={allState} />
      <Average average={average}  />
      <All allNum={all} />
      <Pos pos={pos} />
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
