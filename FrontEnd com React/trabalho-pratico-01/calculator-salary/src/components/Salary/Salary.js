import React, { Component, Fragment } from 'react';
import Value from '../Value/Value';
import css from './salary.module.css';
import Bar from '../Bar/Bar';

export default class Salary extends Component {
  render() {
    return (
      <Fragment>
        <div className={css.border}>
          <div>
            <Value
              Id="vlrSalarioBruto"
              Estilo={{ Width: '100%', maxWidth: '100%' }}
              tituloCampo="Salário Bruto"
              placeholderCampo="Informe o Salario Bruto"
              habilitaCampo
              ApenasInformarValor
            />
          </div>
          <div className={css.valores}>
            <Value
              Id="vlrBaseINSS"
              tituloCampo="Base INSS"
              placeholderCampo="Base do INSS"
            />
            <Value
              Id="vlrDescontoINSS"
              tituloCampo="Desconto INSS"
              placeholderCampo="Desconto do INSS"
            />
            <Value
              Id="vlrBaseIRRF"
              tituloCampo="Base IRRF"
              placeholderCampo="Base do IRPF"
            />
            <Value
              Id="vlrDescontoIRRF"
              tituloCampo="Desconto IRRF"
              placeholderCampo="Desconto do IRPF"
            />
            <Value
              Id="vlrSalarioLiquido"
              tituloCampo="Salário Líquido"
              placeholderCampo="Salário Líquido"
            />
          </div>
          <div className={css.bars}>
            <Bar value={15} color="#e67e22" />
            <Bar value={50} color="#c0392b" />
            <Bar value={35} color="#16a085" />
          </div>
        </div>
      </Fragment>
    );
  }
}
