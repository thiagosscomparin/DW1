let pontosA = 0;
let pontosB = 0;
let setsA = 0;
let setsB = 0;

function atualizarTela() {
    document.getElementById("pontosA").innerText = pontosA;
    document.getElementById("pontosB").innerText = pontosB;
    document.getElementById("setsA").innerText = setsA;
    document.getElementById("setsB").innerText = setsB;
}

function registrarHistorico(texto) {
    let historico = document.getElementById("historico");
    let data = new Date();

    historico.innerHTML += `<p>${texto} - ${data.toLocaleString()}</p>`;
    historico.scrollTop = historico.scrollHeight;
}

function somarPonto(time) {
    if (time === "A") {
        pontosA++;
        registrarHistorico("Time A marcou ponto");
    } else {
        pontosB++;
        registrarHistorico("Time B marcou ponto");
    }

    atualizarTela();
}

function tirarPonto(time) {
    if (time === "A" && pontosA > 0) {
        pontosA--;
        registrarHistorico("Time A perdeu ponto");
    }

    if (time === "B" && pontosB > 0) {
        pontosB--;
        registrarHistorico("Time B perdeu ponto");
    }

    atualizarTela();
}

function somarSet(time) {
    if (time === "A") {
        setsA++;
        registrarHistorico("Time A venceu um set");
    } else {
        setsB++;
        registrarHistorico("Time B venceu um set");
    }

    atualizarTela();
}

function tirarSet(time) {
    if (time === "A" && setsA > 0) {
        setsA--;
        registrarHistorico("Time A perdeu um set");
    }

    if (time === "B" && setsB > 0) {
        setsB--;
        registrarHistorico("Time B perdeu um set");
    }

    atualizarTela();
}

function zerarPlacar() {
    pontosA = 0;
    pontosB = 0;
    setsA = 0;
    setsB = 0;

    registrarHistorico("Placar zerado");

    atualizarTela();
}