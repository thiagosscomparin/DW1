function calcularTotal() {
    const dogBasico = document.getElementById('inputdogbasico').value * 22;
    const dogCompleto = document.getElementById('inputdogcompleto').value * 26;
    const Xsalada = document.getElementById('inputXsalada').value * 29;
    const RefriP = document.getElementById('inputRefriP').value * 5;
    const RefriG = document.getElementById('inputRefriG').value * 8;

    const total = dogBasico + dogCompleto + Xsalada + RefriP + RefriG;
    document.getElementById('resultado').innerText = `Total: R$ ${total.toFixed(2)}`;
}