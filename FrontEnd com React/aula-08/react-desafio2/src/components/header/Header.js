import React, { Component, Fragment } from 'react';
import { formatNumber } from '../helpers/formatHelpers';
import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangedFilter(newText);
  };

  render() {
    const { filter, totalCountries, filterPopulation } = this.props;
    return (
      <Fragment>
        <div className={css.flexRow}>
          <input
            placeholder="Informe o nome do país"
            type="text"
            style={{ Width: '200px' }}
            value={filter}
            onChange={this.handleInputChange}
          />
          <span className={css.countries}>
            | Quantidade de Países:{' '}
            <strong>{formatNumber(totalCountries)}</strong>
          </span>

          <span className={css.population}>
            | População total: <strong>{formatNumber(filterPopulation)}</strong>
          </span>
        </div>
      </Fragment>
    );
  }
}
