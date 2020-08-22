import React, { Fragment, useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [usefilter, setUseFilter] = useState('');
  const [filterPopulation, setFilterPopulation] = useState(0);

  useEffect(() => {
    const fetchFindCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();

      const allCountries = json.map(
        ({ translations, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name: translations.br,
            filterName: translations.br.toLowerCase(),
            flag,
            population,
          };
        }
      );
      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
      setFilterPopulation(calculateTotalPopulationFrom(allCountries));
    };
    fetchFindCountries();
  }, []);

  const handleChangedFilter = (newText) => {
    setUseFilter(newText);
    findCountries(newText);
  };

  const findCountries = (newText) => {
    if (!!newText) {
      const filterLowerCase = newText.toLowerCase();
      setFilteredCountries(
        allCountries.filter((country) => {
          return country.filterName.includes(filterLowerCase);
        })
      );
    } else {
      setFilteredCountries(Object.assign([], allCountries));
    }
    setFilterPopulation(calculateTotalPopulationFrom(filteredCountries));
  };

  const calculateTotalPopulationFrom = (countries) => {
    return countries.reduce((accumlator, current) => {
      return accumlator + current.population;
    }, 0);
  };

  return (
    <Fragment>
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header
          filterPopulation={filterPopulation}
          totalCountries={filteredCountries.length}
          filter={usefilter}
          onChangedFilter={handleChangedFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    </Fragment>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
