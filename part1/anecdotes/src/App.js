import { useState } from 'react'

const Anecdote = ({ text, votes }) => (
    <div>
        <div>{text}</div>
        <div>has {votes} votes</div>
    </div>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    ]

    const getRandom = () => Math.floor(Math.random() * anecdotes.length)
    const [selected, setSelected] = useState(getRandom)
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

    const vote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    const mostVotes = votes.indexOf(Math.max.apply(Math, votes))

    return (
        <div>
            <h2>Anedote if the day</h2>
            <Anecdote
                text={anecdotes[selected]}
                votes={votes[selected]}
            ></Anecdote>
            <Button handleClick={vote} text='vote'></Button>
            <Button
                handleClick={() => setSelected(getRandom)}
                text='next anecdote'
            ></Button>
            <h2>Anecdote with most votes</h2>
            <Anecdote
                text={anecdotes[mostVotes]}
                votes={votes[mostVotes]}
            ></Anecdote>
        </div>
    )
}

export default App
