import React, { useState } from 'react'
const Statistics  = props => {
  const total  = props.good+props.bad+props.neutral
  if (total === 0){
    return <>No feedback given</>
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} /> 
          <tr>
            <td>all </td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(props.good - props.bad)/total}</td>
          </tr>
          <tr>
            <td>positive {props.good / total *100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
const StatisticLine = props => {
  return(  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>

  </tr>)


}
const Button = (props) => {
  return(
      <button onClick={props.function}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      
      <Button text = "good" function = {() => setGood(good+1)}></Button>
      <Button text = "neutral" function = {() => setNeutral(neutral+1)}></Button>
      <Button text = "bad" function = {() => setBad(bad+1)}></Button>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App

