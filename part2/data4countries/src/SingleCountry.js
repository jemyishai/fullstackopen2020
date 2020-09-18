import React from "react";

const SingleCountry = ({country,countries}) => {
  let countryObj = countries.find(element=>element.name === country);

  if (country && countryObj){
    console.log(countryObj.languages)
  return (
    <div>
      <h1>{country}</h1>
      capital {countryObj.capital && countryObj.capital} <br/>
      population {countryObj.population && countryObj.population}
      <h2>languages</h2>
       {countryObj.languages.map((language)=>(
         <li key={language.name}>{language.name}</li>
       ))}
       <br />
       <img src={countryObj.flag} alt="country flag" width="100px" height="100px"></img>
    </div>
  )
  } else{
    return(<div>'patience padiwan - ain't no country with these letters'</div>)
  }
}

export default SingleCountry;
