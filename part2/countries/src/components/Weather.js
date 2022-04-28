import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
            )
            .then((response) => {
                setWeather(response.data)
            })
    }, [])

    if (weather === null) return
    return (
        <div>
            <h3>Weather in {city}</h3>
            <div>temperature {weather.main.temp} Celsius</div>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt='weather icon'
            />
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather
