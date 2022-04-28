import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons(response.data)
        })
    }, [])

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
