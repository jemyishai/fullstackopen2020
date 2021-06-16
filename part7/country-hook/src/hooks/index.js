import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { render } from "react-dom";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => setValue("");

  return {
    reset,
    inputField: {
      type,
      value,
      onChange,
    },
  };
};

export const useCountry = (name) => {
  const [countryObject, setCountryObject] = useState(null);

  const reset = () => setCountryObject(null);

  const countryCall = async () => {
    await axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((response) => {
        // console.log(response.data);
        setCountryObject(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    countryCall();
    reset();
  }, [name]);

  return countryObject;
};
