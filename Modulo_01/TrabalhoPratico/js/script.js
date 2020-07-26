window.addEventListener("load", start);

global_TextVermelho = document.querySelector("#iptTXTVermelho");
global_TextVerde = document.querySelector("#iptTXTVerde");
global_TextAzul = document.querySelector("#iptTXTAzul");
global_DivCor = document.querySelector("#CorRGB");

function start(event){
    iptRangeVermelho.addEventListener("input", setValorVermelho);
    iptRangeVerde.addEventListener("input", setValorVerde);
    iptRangeAzul.addEventListener("input", setValorAzul);
}

function setValorAzul(event){ 
    setarValorText(event.target, global_TextAzul);
}

function setValorVerde(event){ 
    setarValorText(event.target, global_TextVerde);
}

function setValorVermelho(event){ 
    setarValorText(event.target, global_TextVermelho);
}

function setarValorText(range, text){
    text.value = range.value;

    mudarCorDiv( global_TextVermelho.value, global_TextVerde.value, global_TextAzul.value );
}

function mudarCorDiv(CorVermelho, CorVerde, CorAzul) {
    global_DivCor.style.background = 'rgb('+CorVermelho+','+CorVerde+','+CorAzul+')';
}


