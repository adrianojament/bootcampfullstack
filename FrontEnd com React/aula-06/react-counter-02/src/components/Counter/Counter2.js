// rcc Criar a classe

import React, { Component } from 'react';
import css from './count.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';

export default class Counter2 extends Component {
  handleButtonClick = (clickType) => {
    this.props.onCount(clickType);
  };

  render() {
    const { countValue, currentSteps } = this.props;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={countValue} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Value value={'(' + currentSteps + ')'} />
      </div>
    );
  }
}
