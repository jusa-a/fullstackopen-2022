const Search = ({ value, setFilter }) => (
    <form onSubmit={(event) => event.preventDefault()}>
        <label>find countries </label>
        <input
            value={value}
            onChange={(event) => setFilter(event.target.value)}
        />
    </form>
)

export default Search
