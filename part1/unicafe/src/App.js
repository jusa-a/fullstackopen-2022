import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad

    if (all === 0) {
        return <div>No feedback given</div>
    }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good}></StatisticLine>
                    <StatisticLine
                        text='neutral'
                        value={neutral}
                    ></StatisticLine>
                    <StatisticLine text='bad' value={bad}></StatisticLine>
                    <StatisticLine text='all' value={all}></StatisticLine>
                    <StatisticLine
                        text='average'
                        value={(good - bad) / all}
                    ></StatisticLine>
                    <StatisticLine
                        text='positive'
                        value={(good / all) * 100 + '%'}
                    ></StatisticLine>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={() => setGood(good + 1)} text='good'></Button>
            <Button
                handleClick={() => setNeutral(neutral + 1)}
                text='neutral'
            ></Button>
            <Button handleClick={() => setBad(bad + 1)} text='bad'></Button>
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </div>
    )
}

export default App
