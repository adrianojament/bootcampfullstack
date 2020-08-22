import React, { Fragment } from 'react';
import { formatNumber } from '../helpers/formatHelpers';
import css from './header.module.css';

export default function Header(props) {
  const handleInputChange = (event) => {
    const newText = event.target.value;
    props.onChangedFilter(newText);
  };

  const { filter, totalCountries, filterPopulation } = props;
  return (
    <Fragment>
      <div className={css.flexRow}>
        <input
          placeholder="Informe o nome do país"
          type="text"
          style={{ Width: '200px' }}
          value={filter}
          onChange={handleInputChange}
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
