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
  <>
    <td>
      {text} {stat} {symbol}
    </td>
  </>
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
      <br />
      <table>
        <tbody>
          {[
            ["good", good],
            ["neutral", neutral],
            ["bad", bad],
            ["all", all],
            ["average", average],
            ["positive", pos, "%"],
          ].map((arr, index) => (
            <tr key={index}>
              <Statistic text={arr[0]} stat={arr[1]} symbol={arr[2]} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Buttons = ({ clickEvent }) => (
  <div>
    {[
      ["g", "good"],
      ["n", "neutral"],
      ["b", "bad"],
    ].map((arr, index) => (
      <Button
        key={index}
        handleClick={() => clickEvent(arr[0])}
        text={arr[1]}
      />
    ))}
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
