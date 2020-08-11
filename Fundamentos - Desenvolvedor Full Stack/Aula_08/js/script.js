// Essa forma evita que o metodo função seja executa
// window.addEventListener('load', start);
// Sem os parenteses.

window.addEventListener('load', start);

function start(){
    var texto = document.querySelector('#nameInput');
    texto.addEventListener('keyup', countName);

    var form = document.querySelector('form');
    form.addEventListener('submit', preventSubmit);    
}

function countName(event){
    
    var count = event.target.value;    
    var span = document.querySelector('#nameLength');
    if (count.length > 0){
        span.textContent = 'Contador de caracteres: '+count.length;
    }else{
        span.textContent = '';
    }    
}

function preventSubmit(event){
    event.preventDefault();
    
    var texto = document.querySelector('#nameInput');
    alert(texto.value + ' cadastrado com sucesso.');
}



