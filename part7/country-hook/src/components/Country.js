import React from "react";

export const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  let currentCountry;
  country[0] ? (currentCountry = country[0]) : (currentCountry = null);

  console.log(currentCountry);

  if (!currentCountry.area) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{currentCountry.name} </h3>
      <div>capital {currentCountry.capital} </div>
      <div>population {currentCountry.population}</div>
      <img
        src={currentCountry.flag}
        height="100"
        alt={`flag of ${currentCountry.name}`}
      />
    </div>
  );
};
export const MemoizedCountry = React.memo(Country);
