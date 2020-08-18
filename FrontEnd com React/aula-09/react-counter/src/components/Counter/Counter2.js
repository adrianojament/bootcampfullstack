// rcc Criar a classe

import React from 'react';
import css from './count.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';

export default function Counter2(props) {
  const handleButtonClick = (clickType) => {
    props.onCount(clickType);
  };

  const { countValue, currentSteps } = props;
  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick} />
      <Value value={countValue} />
      <IncrementButton onIncrement={handleButtonClick} />
      <Value value={'(' + currentSteps + ')'} />
    </div>
  );
}
