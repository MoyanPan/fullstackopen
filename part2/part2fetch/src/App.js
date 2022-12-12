import React, { useState, useEffect} from 'react'
import axios from 'axios' 
import Countrydisplay from './component/Countrydisplay'



const App = () => {
  const [filter,setFilter] = useState("")
  const [country, setCountry] = useState([])
  const countriestoshow = filter === "" ?country :country.filter(x => x.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data.map(res => res.name.common)
        setCountry(data)
      })
  }, [])
  return (
    <>
    <h1>find countries <input value = {filter} onChange={handleFilterChange}></input></h1>
    {countriestoshow.length >= 10 && filter !== "" ?(<h3>Too many countries</h3>) : (countriestoshow.map(x => <Countrydisplay key = {x} country = {x}/>))}
    
    </>
  )
}
export default App