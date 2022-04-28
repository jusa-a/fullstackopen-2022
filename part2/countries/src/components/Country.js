import Weather from './Weather'

const Country = ({ country }) => (
    <div>
        <h2>{country.name.common}</h2>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>
        <h4>languages:</h4>
        <ul>
            {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        <img
            width='300px'
            src={country.flags.svg}
            alt={`flag of ${country.name.common}`}
        />
        <Weather city={country.capital[0]} />
    </div>
)

export default Country
