import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notification, setNotification] = useState({})

    useEffect(() => {
        personService.getAll().then((returnedPerson) => {
            setPersons(returnedPerson)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some((p) => p.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                changeNumber()
            }
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        personService.create(personObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({ message: `Added ${returnedPerson.name}` })
            setTimeout(() => {
                setNotification({})
            }, 3000)
        })
    }

    const changeNumber = () => {
        const person = persons.find((p) => p.name === newName)
        const newPerson = { ...person, number: newNumber }

        personService
            .update(person.id, newPerson)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((p) =>
                        p.id !== person.id ? p : returnedPerson
                    )
                )
                setNotification({
                    message: `Changed ${returnedPerson.name} number to ${returnedPerson.number}`,
                })
                setTimeout(() => {
                    setNotification({})
                }, 3000)
            })
            .catch((e) => {
                setNotification({
                    message: `Information of ${person.name} has already been removed from server`,
                    type: 'error',
                })
                setTimeout(() => {
                    setNotification({})
                }, 3000)
                setPersons(persons.filter((p) => p.id !== person.id))
            })

        setNewName('')
        setNewNumber('')
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            personService.remove(id).then(() => {
                setPersons(persons.filter((p) => p.id !== id))
                setNotification({ message: `Deleted ${name}` })
                setTimeout(() => {
                    setNotification({})
                }, 3000)
            })
        }
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
            <Notification notification={notification} />
            <Filter value={newFilter} handleChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                name={newName}
                number={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                handleSubmit={addPerson}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App
