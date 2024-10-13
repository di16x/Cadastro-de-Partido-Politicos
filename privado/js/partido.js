
const formPartido = document.getElementById('Forms');
formPartido.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:4000/clientes';

buscarTodosPartidos();

var motivoAcao = "CADASTRAR";

function gravarCliente(){
    const objetoPartido = {
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('sigla').value,
        num_registro: document.getElementById('num_registro').value
        
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });

}

function selecionarPartido(nome, sigla, num_registro, motivo) {

   
    document.getElementById('nome').value = nome;
    document.getElementById('sigla').value = endereco;
    document.getElementById('num_registro').value = cidade;
   

    motivoAcao = motivo;
    const botaoConfirmar = document.getElementById('botaoConfirmar1');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmar.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmar.innerHTML = 'EXCLUIR';
    }


}

function excluirPartido(){

    fetch(enderecoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({num_registro: document.getElementById('num_registro').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });
}

function atualizarPartido(){

    const objetoPartido = {
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('sigla').value,
        num_registro: document.getElementById('num_registro').value,
    }

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });

}

function buscarTodosPartidos(){
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaPartidos(respostaAPI.listaClientes);
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    })
    .catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });
}

function validarCampos(evento){
    
    const nome     = document.getElementById('nome').value;
    const sigla = document.getElementById('sigla').value;
    const num_registro   = document.getElementById('num_registro').value;
  

    
    evento.stopPropagation();
    evento.preventDefault();

    if (nome && sigla && num_registro) {
        if (motivoAcao == "CADASTRAR"){
            gravarPartido();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarPartido();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirPartido();
            motivoAcao = "CADASTRAR";
        }
        
        formPartido.reset();
        buscarTodosClientes();
        return true;
    }
    else{
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}


function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaPartidos(listaPartidos){
    if (listaPartidos.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>NOME</th>
                <th>SIGLA</th>
                <th>Nº REGISTRO</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const partido of listaPartidos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                
                <td>${partido.nome}</td>
                <td>${partido.sigla}</td>
                <td>${partido.num_registro}</td>
               
               
                <td>
                    <button onclick="selecionarPartido('${partido.nome}','${partido.sigla}','${partido.num_registro}','EDITAR')">Alterar</button>
                    <button onclick="selecionarPartido('${partido.nome}','${partido.sigla}','${partido.num_registro},'EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML="";
        espacoTabela.appendChild(tabela);
    }
    else{
        exibirMensagem('Nenhum item encontrado.');
    }
}