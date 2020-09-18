import React, { useState, useEffect } from "react";
import axios from "axios";



const Weather = ({country, countryInfo}) => {


const [data, setData] = useState([])
const [temp, setTemp] = useState('')
const [image, setImage] = useState('')
const [wind, setWind] = useState('')
const [city, setCity] = useState(countryInfo.capital)

useEffect(()=>{
  axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}&units=f`)
  .then((response) => {
      setData(response.data)
  })
},[city])

console.log(city)
console.log(data)

if (data.current && country){
  return(
    <div>
    <h1>Weather in {country}</h1>
    temperature: {data.current.temperature} Farenheit <br/>
    <img src={data.current.weather_icons[0]} width="100px" height="100px"alt="weather icon"/> <br />
    wind:&nbsp;{data.current.wind_speed}&nbsp; mph direction &nbsp; {data.current.wind_dir}
    </div>
  )
} else{
  return(
    <div>
    'Patience Young Padiwan'
    </div>
  )
}
}


export default Weather
