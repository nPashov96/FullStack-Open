import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    if (searchItem.trim() === "") {
      setCountries([]);
      return;
    }
    const fetchCountry = async () => {
      try {
        const url = `https://restcountries.com/v3.1/name/${searchItem}`;
        const response = await axios.get(url);
        setCountries(response.data);
      } catch (error) {
        console.log(`Error fetching data`, error);
      }
    };
    fetchCountry();
  }, [searchItem]);

  return (
    <div>
      <h1>Country Info App</h1>
      <label>
        Search for a country:
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </label>

      {countries.length > 10 ? (
        <p>Too many countries, please be more specific!</p>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}

      {countries.length === 1 && (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.keys(countries[0].languages).map((key) => (
              <li key={key}>{countries[0].languages[key]}</li>
            ))}
          </ul>
          <img
            src={countries[0].flags.svg}
            alt="flag"
            className="country-flag"
          />
        </div>
      )}
    </div>
  );
}

export default App;
