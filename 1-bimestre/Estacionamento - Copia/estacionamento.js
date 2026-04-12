function fcalcular() {

    let entrada = new Date(document.getElementById("entrada").value);
    let saida = new Date(document.getElementById("saida").value);

    let grande = document.getElementById("inputTamanho").checked;
    let cf = document.getElementById("inputFrequente").checked;

    if (!entrada || !saida || isNaN(entrada) || isNaN(saida)) {
        alert("Preencha as datas corretamente!");
        return;
    }

    if (saida <= entrada) {
        alert("A saída deve ser depois da entrada!");
        return;
    }

    // diferença em milissegundos
    let diff = saida - entrada;

    // converter para horas
    let h = diff / (1000 * 60 * 60);

    // arredondar pra cima
    h = Math.ceil(h);

    let tarifa = 0;

    // Até 24 horas
    if (h < 24) {
        tarifa = 2.5 + h * 2.5;
    } else {
        let dias = Math.floor(h / 24);
        let resto = h % 24;

        tarifa = dias * 60;
        tarifa += resto * 2.5;
    }

    // Carro grande
    if (grande) {
        tarifa *= 1.25;
    }

    // Cliente frequente
    if (cf) {
        tarifa *= 0.95;
    }

    document.getElementById("resp").innerHTML =
        `Tempo: ${h} horas | Valor: R$ ${tarifa.toFixed(2)}`;
}