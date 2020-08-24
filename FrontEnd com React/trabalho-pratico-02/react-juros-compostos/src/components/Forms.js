import React from 'react';
import css from './forms.module.css';

export default function Forms({ children }) {
  return <div className={css.form}>{children}</div>;
}
