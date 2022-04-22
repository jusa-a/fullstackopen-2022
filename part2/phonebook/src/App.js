import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addName = (event) => {
        event.preventDefault()

        if (persons.some((p) => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setNewFilter(event.target.value)

    const personsToShow = persons.filter((p) =>
        p.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} handleChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                name={newName}
                number={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                handleSubmit={addName}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App