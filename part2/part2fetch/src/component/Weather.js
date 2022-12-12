import React from 'react'
import axios from 'axios' 
import { useEffect,useState} from 'react'




const Weather = (props) => {
    const [weather,setWeather] = useState([])
    const API = '13defb523c632360d39c0171fee5254b'
    const toTextualDescription = (degree) =>{
        if (degree>337.5) return 'Northerly';
        if (degree>292.5) return 'North Westerly';
        if(degree>247.5) return 'Westerly';
        if(degree>202.5) return 'South Westerly';
        if(degree>157.5) return 'Southerly';
        if(degree>122.5) return 'South Easterly';
        if(degree>67.5) return 'Easterly';
        if(degree>22.5){return 'North Easterly';}
        return 'Northerly';
    }
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country}&appid=${API}`).then(res => {
            let temp = []
            temp.push(Math.round(res.data.main.temp-273.15),res.data.weather[0].icon,res.data.wind.speed,toTextualDescription(res.data.wind.deg))
            setWeather(temp)
            console.log(temp);

        })
    },[])

    return (<>
    <h1>Weather in {props.country}</h1>
    <h3>temperature: {weather[0]} Celcius</h3>
    <img id = "WeatherImg"  src={`http://openweathermap.org/img/wn/${weather[1]}@2x.png`}/>
    <h3>wind: {weather[2]}mph direction {weather[3]}</h3>
    </>)
}

export default Weather