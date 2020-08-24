import React from 'react';
import css from './installment.module.css';

export default function Installment({
  id,
  parcela,
  rendimento,
  rendimentoMensal,
  jurosMensal,
}) {
  let formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  let option = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  let formatterPercent = new Intl.NumberFormat('pt-br', option);

  return (
    <div className={css.border} key={id}>
      <div className={`${css.parcela}`}>{parcela}</div>
      <div className={css.flexCol}>
        <span>{formatter.format(rendimento)}</span>
        <span>{formatter.format(rendimentoMensal)}</span>
        <span>{formatterPercent.format(jurosMensal)}</span>
      </div>
    </div>
  );
}
