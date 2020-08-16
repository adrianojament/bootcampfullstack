import React, { Component, Fragment } from 'react';
import Value from '../Value/Value';
import css from './salary.module.css';
import Bar from '../Bar/Bar';
import { calculateSalaryFrom } from '../CalculateSalary/calculateSalary.js';
import * as FormataValores from '../../helpers/FormatValue';

const corPreto = '#000000';
const corInss = '#e67e22';
const corIrrf = '#c0392b';
const corLiquido = '#16a085';

export default class Salary extends Component {
  constructor() {
    super();

    const {
      FormatarValoresMonetarios,
      FormatarValoresMonetariosPercentuais,
    } = FormataValores;

    this.state = {
      vlrSalario: 0,
      bsInss: FormatarValoresMonetarios(0),
      bsIrrf: FormatarValoresMonetarios(0),
      vlrInss: FormatarValoresMonetariosPercentuais(0, 0),
      vlrIrrf: FormatarValoresMonetariosPercentuais(0, 0),
      vlrLiq: FormatarValoresMonetariosPercentuais(0, 0),
      perIrrf: 0,
      perInss: 0,
      perLiq: 0,
    };
  }

  handleOnChangeSalario = (value) => {
    const {
      FormatarValoresMonetarios,
      FormatarValoresMonetariosPercentuais,
    } = FormataValores;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
    } = calculateSalaryFrom(value);

    const perInss = discountINSS / value;
    const perIrrf = discountIRPF / value;
    const salarioLiq = value - discountINSS - discountIRPF;
    const perLiq = salarioLiq / value;

    this.setState({
      vlrSalario: value,
      vlrInss: FormatarValoresMonetarios(discountINSS),
      bsInss: FormatarValoresMonetarios(baseINSS),
      vlrIrrf: FormatarValoresMonetarios(discountIRPF),
      bsIrrf: FormatarValoresMonetarios(baseIRPF),
      vlrLiq: FormatarValoresMonetarios(salarioLiq),
      vlrInss: FormatarValoresMonetariosPercentuais(discountINSS, perInss),
      vlrIrrf: FormatarValoresMonetariosPercentuais(discountIRPF, perIrrf),
      vlrLiq: FormatarValoresMonetariosPercentuais(salarioLiq, perLiq),
      perInss: perInss * 100,
      perIrrf: perIrrf * 100,
      perLiq: perLiq * 100,
    });
  };

  render() {
    const {
      vlrSalario,
      bsInss,
      vlrInss,
      bsIrrf,
      vlrIrrf,
      vlrLiq,
      perInss,
      perIrrf,
      perLiq,
    } = this.state;
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
              foreColor={corPreto}
              value={vlrSalario}
              onHandleChange={this.handleOnChangeSalario}
            />
          </div>
          <div className={css.valores}>
            <Value
              Id="vlrBaseINSS"
              tituloCampo="Base INSS"
              placeholderCampo="Base do INSS"
              value={bsInss}
              foreColor={corPreto}
              fontBold
            />
            <Value
              Id="vlrDescontoINSS"
              tituloCampo="Desconto INSS"
              placeholderCampo="Desconto do INSS"
              value={vlrInss}
              foreColor={corInss}
              fontBold
            />
            <Value
              Id="vlrBaseIRRF"
              tituloCampo="Base IRRF"
              placeholderCampo="Base do IRPF"
              value={bsIrrf}
              foreColor={corPreto}
              fontBold
            />
            <Value
              Id="vlrDescontoIRRF"
              tituloCampo="Desconto IRRF"
              placeholderCampo="Desconto do IRPF"
              value={vlrIrrf}
              foreColor={corIrrf}
              fontBold
            />
            <Value
              Id="vlrSalarioLiquido"
              tituloCampo="Salário Líquido"
              placeholderCampo="Salário Líquido"
              value={vlrLiq}
              foreColor={corLiquido}
              fontBold
            />
          </div>
          <div className={css.bars}>
            <Bar value={perInss} color={corInss} />
            <Bar value={perIrrf} color={corIrrf} />
            <Bar value={perLiq} color={corLiquido} />
          </div>
        </div>
      </Fragment>
    );
  }
}
