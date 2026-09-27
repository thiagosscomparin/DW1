const URL_API = 'http://localhost:3001';
const SILHUETA_URL = `${URL_API}/imagens/silhueta.png`;

let oQueEstaFazendo = '';
let ferramenta = null;
bloquearAtributos(true);

// Carrega a imagem do banco ou mostra a silhueta
function carregarImagem(id) {
    const img = document.getElementById('imgCartaz');
    if (!id) {
        img.src = SILHUETA_URL;
        return;
    }
    img.src = `${URL_API}/imagens/${id}.png?t=${new Date().getTime()}`;
    img.onerror = () => { img.src = SILHUETA_URL; };
}

// Aciona o clique no input hidden APENAS se estiver inserindo ou alterando
function acionarUpload() {
    if (oQueEstaFazendo !== 'inserindo' && oQueEstaFazendo !== 'alterando') {
        mostrarAviso("Clique em Inserir ou Alterar primeiro para poder escolher uma imagem.");
        return;
    }
    document.getElementById('inputImagem').click();
}

// Apenas mostra a imagem na tela localmente (sem enviar pro servidor ainda)
function previewImagem() {
    const inputFiles = document.getElementById('inputImagem').files;
    if (inputFiles.length > 0) {
        // Cria uma URL temporária para visualização instantânea
        const url = URL.createObjectURL(inputFiles[0]);
        document.getElementById('imgCartaz').src = url;
        mostrarAviso("Imagem escolhida! Clique em Salvar para concluir.");
    }
}

// Função auxiliar para enviar a imagem para a API
async function uploadImagemParaServidor(id) {
    const inputFiles = document.getElementById('inputImagem').files;
    if (inputFiles.length === 0) return; // Se não escolheu imagem, não faz nada

    const formData = new FormData();
    formData.append('cartaz', inputFiles[0]);

    try {
        await fetch(`${URL_API}/upload/${id}`, {
            method: 'POST',
            body: formData
        });
    } catch (erro) {
        console.error("Erro ao enviar imagem:", erro);
    }
}

async function procurePorChavePrimaria(chave) {
    try {
        const resposta = await fetch(`${URL_API}/ferramenta/${chave}`);
        const data = await resposta.json();
        return data.sucesso ? data.ferramenta : null;
    } catch (erro) {
        return null;
    }
}

async function procure() {
    const id_ferramenta = document.getElementById("inputId_ferramenta").value;
    if (isNaN(id_ferramenta) || !Number.isInteger(Number(id_ferramenta)) || id_ferramenta === "") {
        mostrarAviso("Precisa ser um número inteiro");
        return;
    }

    ferramenta = await procurePorChavePrimaria(id_ferramenta);
    oQueEstaFazendo = ''; // Reseta o estado
    
    if (ferramenta) {
        mostrarDadosFerramenta(ferramenta);
        carregarImagem(id_ferramenta);
        visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
        mostrarAviso("Achou no banco, pode alterar ou excluir");
    } else {
        limparAtributos();
        carregarImagem(null);
        visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
        mostrarAviso("Não achou no banco, pode inserir");
    }
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos, escolha a imagem e clique em salvar");
}

function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos, mude a imagem (opcional) e clique em salvar");
}

function excluir() {
    bloquearAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique em salvar para confirmar a exclusão");
}

async function salvar() {
    let id_ferramenta = document.getElementById("inputId_ferramenta").value;
    const nome_ferramenta = document.getElementById("inputNome_ferramenta").value;
    const descricao_ferramenta = document.getElementById("inputDescricao_ferramenta").value;
    const preco_ferramenta = parseFloat(document.getElementById("inputPreco_ferramenta").value);

    const dadosFerramenta = { id_ferramenta, nome_ferramenta, descricao_ferramenta, preco_ferramenta };

    try {
        if (oQueEstaFazendo === 'inserindo') {
            await fetch(`${URL_API}/ferramenta`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dadosFerramenta) });
            await uploadImagemParaServidor(id_ferramenta); // Salva a imagem após o texto
            mostrarAviso("Inserido no Banco de Dados com sucesso!");
        } else if (oQueEstaFazendo === 'alterando') {
            await fetch(`${URL_API}/ferramenta/${id_ferramenta}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dadosFerramenta) });
            await uploadImagemParaServidor(id_ferramenta); // Atualiza a imagem após o texto
            mostrarAviso("Alterado no Banco de Dados com sucesso!");
        } else if (oQueEstaFazendo === 'excluindo') {
            await fetch(`${URL_API}/ferramenta/${id_ferramenta}`, { method: 'DELETE' });
            carregarImagem(null);
            mostrarAviso("Excluído do Banco de Dados!");
        }

        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        document.getElementById("inputId_ferramenta").value = "";
        listar();
    } catch (erro) {
        mostrarAviso("Erro ao efetuar operação no servidor.");
    }
}

async function listar() {
    try {
        const resposta = await fetch(`${URL_API}/ferramentas`);
        const data = await resposta.json();
        if (data.sucesso) {
            let texto = "";
            for (let linha of data.ferramentas) {
                texto += `${linha.id_ferramenta} - ${linha.nome_ferramenta} - ${linha.descricao_ferramenta} - R$ ${linha.preco_ferramenta.toFixed(2)}<br>`;
            }
            document.getElementById("outputSaida").innerHTML = texto || "Nenhuma ferramenta cadastrada.";
        }
    } catch (erro) {
        document.getElementById("outputSaida").innerHTML = "Servidor offline.";
    }
}

function cancelarOperacao() {
    limparAtributos();
    carregarImagem(null);
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação");
}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosFerramenta(f) {
    document.getElementById("inputId_ferramenta").value = f.id_ferramenta;
    document.getElementById("inputNome_ferramenta").value = f.nome_ferramenta;
    document.getElementById("inputDescricao_ferramenta").value = f.descricao_ferramenta;
    document.getElementById("inputPreco_ferramenta").value = f.preco_ferramenta;
    bloquearAtributos(true);
}

function limparAtributos() {
    ferramenta = null;
    oQueEstaFazendo = ''; // Limpa a ação atual
    document.getElementById("inputNome_ferramenta").value = "";
    document.getElementById("inputDescricao_ferramenta").value = "";
    document.getElementById("inputPreco_ferramenta").value = "";
    document.getElementById("inputImagem").value = ""; 
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputId_ferramenta").readOnly = !soLeitura;
    document.getElementById("inputNome_ferramenta").readOnly = soLeitura;
    document.getElementById("inputDescricao_ferramenta").readOnly = soLeitura;
    document.getElementById("inputPreco_ferramenta").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btP, btI, btA, btE, btS) {
    document.getElementById("btProcure").style.display = btP;
    document.getElementById("btInserir").style.display = btI;
    document.getElementById("btAlterar").style.display = btA;
    document.getElementById("btExcluir").style.display = btE;
    document.getElementById("btSalvar").style.display = btS;
    document.getElementById("btCancelar").style.display = btS;
}