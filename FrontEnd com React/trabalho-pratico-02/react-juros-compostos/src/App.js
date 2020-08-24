import React, { Fragment, useState, useEffect } from 'react';
import { CalcularJuros } from './RegraNegocio/CalcularJurosComposto';
import Forms from './components/Forms';
import CampoNumerico from './RegraNegocio/CampoNumerico/CampoNumerico';
import Installments from './components/Installments';
//

export default function App() {
  const [valorCapitalInicial, setValorCapitalInicial] = useState(100);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState(0.1);
  const [parcelas, setParcelas] = useState(1);
  const [jurosCompostos, setJurosCompostos] = useState([]);

  useEffect(() => {
    let juros = [];
    if (parcelas > 0) {
      juros = CalcularJuros(valorCapitalInicial, taxaJurosMensal, parcelas);
    }
    setJurosCompostos(juros);
  }, [valorCapitalInicial, taxaJurosMensal, parcelas]);

  const handleChangeCapitalInicial = (valor) => {
    setValorCapitalInicial(valor);
  };

  const handleChangeJuros = (valor) => {
    setTaxaJurosMensal(valor);
  };

  const handleChangeParcelas = (valor) => {
    setParcelas(valor);
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="center">React - Juros Compostos</h1>
        <Forms>
          <CampoNumerico
            idCampo="idCapitalInicial"
            Titulo="Capital Inicial"
            MinValor={100}
            MaxValor={100000}
            Incremento={100}
            valorCampo={valorCapitalInicial}
            onChangeValor={handleChangeCapitalInicial}
          />
          <CampoNumerico
            idCampo="idJurosMensal"
            Titulo="Taxa de Juros Mensal"
            MinValor={-12}
            MaxValor={12}
            Incremento={0.01}
            valorCampo={taxaJurosMensal}
            onChangeValor={handleChangeJuros}
          />
          <CampoNumerico
            idCampo="idParcelas"
            Titulo="Período (meses)"
            MinValor={1}
            MaxValor={36}
            Incremento={1}
            valorCampo={parcelas}
            onChangeValor={handleChangeParcelas}
          />
        </Forms>
        <Installments jurosComposto={jurosCompostos} />
      </div>
    </Fragment>
  );
}
