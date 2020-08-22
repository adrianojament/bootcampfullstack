// rcc Criar a classe

import React from 'react';
import css from './count.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
export default function Counter() {
  const [currentCounter, setcurrentCounter] = React.useState(2);
  const [steps, setsteps] = React.useState(0);

  const handleButtonClick = (clickType) => {
    setcurrentCounter(
      clickType === '+' ? currentCounter + 1 : currentCounter - 1
    );
    setsteps(steps + 1);
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick} />
      <Value value={currentCounter} />
      <IncrementButton onIncrement={handleButtonClick} />
      <Value value={'(' + steps + ')'} />
    </div>
  );
}
