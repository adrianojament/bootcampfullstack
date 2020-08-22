import React, { Fragment } from 'react';
import Country from './Country';
import css from './countries.module.css';
export default function Countries(props) {
  const { countries } = props;
  return (
    <Fragment>
      <div className={`${css.border} ${css.flexRow}`}>
        {countries.map((country) => {
          return <Country key={country.id} country={country} />;
        })}
      </div>
    </Fragment>
  );
}
