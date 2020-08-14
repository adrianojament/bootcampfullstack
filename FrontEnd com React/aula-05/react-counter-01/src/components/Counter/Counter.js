// rcc Criar a classe

import React, { Component } from 'react';
import css from './count.module.css';

export default class Counter extends Component {
  constructor() {
    super();
    this.currentCounter = 2;
  }

  render() {
    return (
      <div className={css.counterContainer}>
        <button className="wave-effect waves-light btn red darken-4">-</button>
        <span className={css.countValue}>{this.currentCounter}</span>
        <button className="wave-effect waves-light btn green darken-4">
          +
        </button>
      </div>
    );
  }
}
