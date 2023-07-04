import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine  = (props) => {
  return (
    <>  
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td> 
      </tr>
    </>
  )
}

const All = (props) => {
  return (
    <>
      <tr>
        <td>all </td>
        <td>{props.good + props.neutral + props.bad}</td>
      </tr>
    </>
  )
}

const Mean = (props) => {
  return (
    <>
      <tr>
        <td>avarage </td>
        <td>{(props.good - props.bad) / (props.good + props.bad + props.neutral)}</td>
      </tr>
    </>
  )
}

const Positive = (props) => <> <tr> <td>positive </td><td>{props.good / (props.good + props.neutral + props.bad) * 100} % </td> </tr> </>

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad > 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine  text="good" value={good} />
            <StatisticLine  text="neutral" value={neutral} />
            <StatisticLine  text="bad" value={bad} />
            <All good={good} bad={bad} neutral={neutral} />
            <Mean good={good} bad={bad} neutral={neutral} />
            <Positive good={good} bad={bad} neutral={neutral} />
          </tbody>
        </table>
      </>
    )}
  return (<><p>No feedback given</p></>)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
