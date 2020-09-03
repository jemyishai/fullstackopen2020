import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allState = [{ good: good }, { neutral: neutral }, { bad: bad }];

  const clickEvent = (event) => {
    if (event === "g") {
      console.log(good);
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
          return <p key={aProp + 1}> {aProp + " " + obj[aProp]} </p>;
        }
      })}
    </>
  );
};

const Stats = ({ sectionHeader, allState, clickEvent }) => {
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
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
