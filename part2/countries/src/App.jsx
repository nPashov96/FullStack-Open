import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [show, setShow] = useState({});

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

  const showInfo = (countryCode) => {
    setShow((prevState) => ({
      ...prevState,
      [countryCode]: !prevState[countryCode],
    }));
  };

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
          {countries.map((country, index) => (
            <div key={country.cca3}>
              <li>{country.name.common}</li>
              <button onClick={() => showInfo(country.cca3)}>
                {show[country.cca3] ? "hide" : "show"}
              </button>
              {show[country.cca3] && (
                <div>
                  <h1>{countries[index].name.common}</h1>
                  <p>Capital: {countries[index].capital}</p>
                  <p>Area: {countries[index].area}</p>
                  <h2>Languages</h2>
                  <ul>
                    {Object.keys(countries[index].languages).map((key) => (
                      <li key={key}>{countries[index].languages[key]}</li>
                    ))}
                  </ul>
                  <img
                    src={countries[index].flags.svg}
                    alt="flag"
                    className="country-flag"
                  />
                </div>
              )}
            </div>
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
