import Country from './Country'

const Countries = ({ countries, setFilter }) => {
    if (countries.length === 0) {
        return <div>No matches</div>
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    if (countries.length <= 10) {
        return (
            <div>
                {countries.map((country) => (
                    <div key={country.name.common}>
                        {country.name.common}{' '}
                        <button onClick={() => setFilter(country.name.common)}>
                            show
                        </button>
                    </div>
                ))}
            </div>
        )
    }

    return <div>Too many matches, specify another filter</div>
}

export default Countries
