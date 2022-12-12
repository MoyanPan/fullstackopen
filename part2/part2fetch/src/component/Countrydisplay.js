import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios' 
import Weather from './Weather'

const Countrydisplay =  (props) => {
    const [countryDetail, setCountryDetail] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => { 
		 axios.get(`https://restcountries.com/v3.1/name/${props.country}`)
		.then(res => {
            let tempList = []
            tempList.push(props.country,res.data[0].capital,res.data[0].population,Object.values(res.data[0].languages),res.data[0].flags.png,false)
            setCountryDetail(tempList);
            setLoading(false);
		})
	},[])
    const buttonHandler = () => {
        let temp = [...countryDetail]
        temp[5] = !temp[5]
        setCountryDetail(temp)
    }
    if (isLoading) {
        return <div className="App">Loading...</div>;
      }
    return (
        <>
        <h1>{props.country}  <button onClick={() => buttonHandler()}>show</button></h1>
        {  countryDetail[5] &&  <div>
            <div>
                <h1><strong>{countryDetail[0]}</strong></h1>
                <h3>capital {countryDetail[1]}</h3>
                <h3>polulation {countryDetail[2]}</h3>
            </div>
            <div>
                <h2><strong>languages</strong></h2>
                <ul>
                    {countryDetail[3].map(x => <li key = {x}>{x}</li>)}
                </ul>
                <img src = {countryDetail[4]} size="50%"/>
            </div>
            <Weather country = {countryDetail[1]}></Weather>
        </div>}
        </>
    )
}

export default Countrydisplay


