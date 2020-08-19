import React, { Component, Fragment } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: '',
      filterPopulation: 0,
    };
  }

  async componentDidMount() {
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
    this.setState({
      allCountries,
      filteredCountries: [],
    });

    this.findCountries();
  }

  handleChangedFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    this.findCountries(newText);
  };

  findCountries = (newText) => {
    let filteredCountries = [];
    if (!!newText) {
      const filterLowerCase = newText.toLowerCase();
      filteredCountries = this.state.allCountries.filter((country) => {
        return country.filterName.includes(filterLowerCase);
      });
    } else {
      filteredCountries = Object.assign([], this.state.allCountries);
    }

    const totalPopulation = filteredCountries.reduce((accumlator, current) => {
      return accumlator + current.population;
    }, 0);

    this.setState({
      filteredCountries,
      filterPopulation: totalPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filterPopulation } = this.state;

    return (
      <Fragment>
        <div className="container">
          <h1 style={styles.centeredTitle}>React Countries</h1>
          <Header
            filterPopulation={filterPopulation}
            totalCountries={filteredCountries.length}
            filter={filter}
            onChangedFilter={this.handleChangedFilter}
          />
          <Countries countries={filteredCountries} />
        </div>
      </Fragment>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
