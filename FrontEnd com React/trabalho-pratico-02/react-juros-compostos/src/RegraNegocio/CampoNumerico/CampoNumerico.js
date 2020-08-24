import React, { useEffect, useState } from 'react';
import css from './camponumerico.module.css';
import { Fragment } from 'react';

export default function CampoNumerico({
  valorCampo,
  idCampo,
  Titulo,
  MinValor = 0,
  MaxValor = 9999,
  Incremento = 1,
  onChangeValor,
}) {
  valorCampo = !!!valorCampo ? MinValor : valorCampo;
  const [valor, setValor] = useState(valorCampo);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (valor < MinValor || valor > MaxValor) {
      setErrorMessage(`Deve ser ${MinValor} entre ${MaxValor}`);
      return;
    }
    setErrorMessage('');
  }, [valor]);

  const handleChange = (event) => {
    valorCampo = +event.target.value;
    setValor(valorCampo);
    onChangeValor(valorCampo);
  };

  return (
    <Fragment>
      <div className={`input-field ${css.numerico}`}>
        <input
          placeholder={Titulo}
          id={`${idCampo}`}
          type="number"
          min={MinValor}
          max={MaxValor}
          step={Incremento}
          value={valor}
          onChange={handleChange}
        />
        <label className="active" htmlFor={`${idCampo}`}>
          {Titulo}
        </label>
        <span className={css.ErrorMessage}>{errorMessage}</span>
      </div>
    </Fragment>
  );
}
