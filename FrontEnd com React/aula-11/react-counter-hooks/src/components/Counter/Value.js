import React from 'react';
import css from './count.module.css';

export default function Value(props) {
  const { value } = props;
  return <span className={css.countValue}>{value}</span>;
}
