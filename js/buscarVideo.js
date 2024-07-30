import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento){
    evento.preventDefault();
    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value.toLowerCase();
    const busca = await conectaApi.buscaVideo();

    const lista = document.querySelector("[data-lista]");
    let encontrouVideos = false;

    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    busca.forEach(elemento => {
        if (elemento.titulo.toLowerCase().includes(dadosDePesquisa)){
            lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem))
            encontrouVideos = true;
        }
})

    if (!encontrouVideos) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>`
    }
}

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

botaoDePesquisa.addEventListener("click", evento => buscarVideo(evento))