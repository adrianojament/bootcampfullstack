import React, { Component, Fragment } from 'react';
import css from './value.module.css';

export default class Value extends Component {
  handleOnChange = (event) => {
    const { onHandleChange } = this.props;
    onHandleChange(event.target.value);
  };

  render() {
    let {
      tituloCampo,
      placeholderCampo,
      habilitaCampo,
      ApenasInformarValor,
      Estilo,
      Id,
      value,
      foreColor,
      fontBold = false,
    } = this.props;

    if (!tituloCampo) {
      tituloCampo = 'Informe o Titulo';
    }

    if (!placeholderCampo) {
      placeholderCampo = 'Informe o Place Holder';
    }

    return (
      <Fragment>
        <div className={css.valor} style={!Estilo ? null : Estilo}>
          <label htmlFor={Id}>
            {tituloCampo}
            <input
              placeholder={placeholderCampo}
              id={Id}
              key={Id}
              type={ApenasInformarValor ? 'number' : 'text'}
              pattern={ApenasInformarValor ? '^-?[0-9]d*.?d*$' : ''}
              readOnly={!habilitaCampo}
              value={value}
              onChange={this.handleOnChange}
              style={{
                color: `${foreColor}`,
                fontWeight: fontBold ? 'bold' : 'normal',
                fontSize: 14,
              }}
            />
          </label>
        </div>
      </Fragment>
    );
  }
}
