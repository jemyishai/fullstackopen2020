import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCountry from "./SingleCountry";

const App = () => {
  const [inputEntry, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState([]);
  const [buttonShow, setButtonShow] = useState(false);
  const [clickedCountry,setClickedCountry] = useState('');

  const inputChange = (event) => {
    const regex = /[^\-a-zA-Z0-9' ]+/gi;
    let filteredInput = event.target.value.replace(regex, "");
    setInput(filteredInput);
    setButtonShow(false)
  };

  const onClick = (country) => {
    console.log(country)
    setClickedCountry(country)
    setButtonShow(true);

  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    let names = [];
    countries.forEach((country) => names.push(country.name));
    setCountryNames(names);
  }, [countries]);

  useEffect(() => {
    const filteringCountryRegex = new RegExp(inputEntry, "i");
    setCurrentDisplay(
      countryNames.filter((country) => filteringCountryRegex.test(country))
    );
  }, [inputEntry, countryNames]);

  console.log(inputEntry);
  console.log(currentDisplay.length);
  console.log(buttonShow);
  return (
    <div>
      find countries <input value={inputEntry} onChange={inputChange} /> <br />
      {currentDisplay.length > 10 ? (
        "Too many matches, specify filter"
      ) : currentDisplay.length <= 10 && currentDisplay.length > 1 ? (
        currentDisplay.map((name) => (
          <div key={name}>
            {name} <button onClick={()=>onClick(name)}>show</button>{" "}
          </div>
        ))
      ) : currentDisplay.length === 1 ? (
        <SingleCountry country={currentDisplay[0]} countries={countries} />
      ) : (
        "keep searching"
      )}

      {
        buttonShow ?
        <SingleCountry country={clickedCountry} countries={countries} />:
        ''
      }
    </div>
  );
};

export default App;
