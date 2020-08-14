import React, { Component } from 'react';
import css from './count.module.css';

export default class Value extends Component {
  render() {
    return <span className={css.countValue}>{this.props.value}</span>;
  }
}
