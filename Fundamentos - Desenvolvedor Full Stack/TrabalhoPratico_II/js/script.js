const urlPessoas =
  'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';

let tabPessoas = null;
let tabDados = null;
let tabLoading = null;

let lblUsuarios = null;
let lblInformacoes = null;

let listaTodasPessoas = [];
let listaPessoasFiltradas = [];

let numberFormat = null;
let btnPesquisa = null;
let txtBuscaUsuario = null;

window.addEventListener('load', () => {
  tabPessoas = document.querySelector('#tabPessoas');
  tabDados = document.querySelector('#tabDados');
  tabLoading = document.querySelector('#tabLoading');

  lblUsuarios = document.querySelector('#lblUsuarios');
  lblInformacoes = document.querySelector('#lblInformacoes');

  btnPesquisa = document.querySelector('#btnPesquisa');
  btnPesquisa.addEventListener('click', Pesquisar);

  txtBuscaUsuario = document.querySelector('#txtBuscaUsuario');
  txtBuscaUsuario.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      Pesquisar();
    }
  });

  numberFormat = Intl.NumberFormat('pt-BR');

  BuscarTodosUsuarios();
});

function Pesquisar() {
  const valor = txtBuscaUsuario.value;

  if (valor.length == 0) {
    return;
  }
  AtivarLoading();
  listaPessoasFiltradas = listaTodasPessoas.filter((pessoas) =>
    pessoas.nome.trim().toUpperCase().includes(valor.trim().toUpperCase())
  );
  render();
  DesativarLoading();
}

async function BuscarTodosUsuarios() {
  const res = await fetch(urlPessoas).then();
  const json = await res.json();
  //const json = people;

  listaTodasPessoas = json.results.map((people) => {
    const { gender, name, dob, picture } = people;
    return {
      sexo: gender === 'female' ? 'F' : 'M',
      nome: name.last + ' ' + name.first,
      idade: dob.age,
      foto: picture.medium,
    };
  });

  DesativarLoading();
}

function AtivarLoading() {
  tabLoading.style.visibility = 'visible';
}

function DesativarLoading() {
  setInterval(() => {
    tabLoading.style.visibility = 'hidden';
  }, 1500);
}

function render() {
  MontarTela(listaPessoasFiltradas);
  MontarEstatisticas(listaPessoasFiltradas);
}

function MontarTela(list) {
  let pessoas = '';
  let msg = 'Nenhum usuário filtrado';
  if (list.length > 0) {
    pessoas = '<div>';
    list.forEach((pessoa) => {
      const { nome, idade, foto } = pessoa;
      const pessoahtml = `
      <div class='pessoa'>         
         <div>            
            <img src="${foto}" alt="${nome}">
         </div>
         <div>            
            <ul>
               <li>${nome}, ${idade} anos</li>               
            </ul>
         </div>
      </div>
    `;
      pessoas += pessoahtml;
    });
    pessoas += '</div>';
    msg = list.length + ' usuário(s) encontrado(s)';
  }
  tabPessoas.innerHTML = pessoas;
  lblUsuarios.textContent = msg;
}

function MontarEstatisticas(list) {
  let montarHTML = '';
  let msg = 'Nada ser exibido';

  if (list.length > 0) {
    msg = 'Estatística';
    const totalSexoMasculino = formatNumber(ContarSexo(list, 'M'));
    const totalSexoFeminino = formatNumber(ContarSexo(list, 'F'));
    const totalIdades = ContaIdade(list);
    const mediaIdades = totalIdades / list.length;

    montarHTML = `
      <div class="dados-estatiticos">
      Sexo Masculino = <strong>${totalSexoMasculino}</strong>  
      </div>
      <div class="dados-estatiticos">
      Sexo Feminino = <strong>${totalSexoFeminino}</strong>
      </div>
      <div class="dados-estatiticos">
      Soma das idades = <strong>${formatNumber(totalIdades)}</strong>
      </div>
      <div class="dados-estatiticos">
      Médias das idades = <strong>${formatNumber(mediaIdades)}</strong>
      </div>
      `;
  }

  lblInformacoes.textContent = msg;
  tabDados.innerHTML = montarHTML;
}

function ContarSexo(list, sexo) {
  const total = list.reduce((accumulator, current) => {
    let conta = 0;
    if (current.sexo === sexo) {
      conta = 1;
    }
    return accumulator + conta;
  }, 0);

  return total;
}

function ContaIdade(list) {
  const total = list.reduce((accumulator, current) => {
    return accumulator + current.idade;
  }, 0);

  return total;
}

function formatNumber(number) {
  return numberFormat.format(number);
}
