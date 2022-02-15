import React, { useRef, useState } from 'react'
import axios from "axios";
import moment from 'moment';


function App() {
  const[weather, setWeather] = useState(null)
  const inputRef = useRef(null)

  const fetchWeather = (e)=>{
    e.preventDefault();
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      q: inputRef.current.value,
      callback: 'test',
      units: 'imperial',
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '512d155141msh702ad3de7019b8dp1d4d6ejsn068626eb48cd'
    }
  };
  axios.request(options).then((response)=> {
    setWeather(JSON.parse(response.data.substring(5, response.data.length -1 )))
  }).catch((error)=>{
    console.error(error);
  });
  }
  console.log(weather)
  return (
    <div>
      <h1>Weather App</h1>
      <form>
      <input ref={inputRef} type='text' placeholder='Name of the city'/>
      <button type='submit' onClick={fetchWeather}>Show me the weather</button>
      </form>
      
      <h2>{weather?.name}</h2>
      <h3>{weather && moment.unix(weather?.sys?.sunrise).format('LLLL')}</h3>
    </div>
  )
}

export default App