import React from 'react';
import Installment from './Installment';
import css from './installments.module.css';

export default function Installments({ jurosComposto }) {
  return (
    <div className={css.flexRow}>
      {jurosComposto.map((valores) => {
        const { Parcela, TotalRendimento, Rendimento, JurosMes } = valores;
        console.log(JurosMes);
        return (
          <Installment
            key={Parcela}
            id={Parcela}
            parcela={Parcela}
            rendimento={TotalRendimento}
            rendimentoMensal={Rendimento}
            jurosMensal={JurosMes}
          />
        );
      })}
    </div>
  );
}
