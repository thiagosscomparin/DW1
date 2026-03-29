  function funcaoCalcular() {
    let classi = "";
    let peso = parseFloat(document.getElementById("inputPeso").value);
    let altura = parseFloat(document.getElementById("inputAltura").value);
    let aviso = document.getElementById("aviso");

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        aviso.innerHTML = "Preencha os campos corretamente!";
        aviso.style.display = "block";
        return;
    }

    aviso.style.display = "none";

    let imc = peso / (altura * altura);
    document.getElementById("respIMC").innerHTML = imc.toFixed(2);

    if (imc < 18.5) {
        classi = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
        classi = "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        classi = "Sobrepeso";
    } else if (imc >= 30 && imc < 35) {
        classi = "Obesidade grau I";
    } else if (imc >= 35 && imc < 40) {
        classi = "Obesidade grau II";
    } else {
        classi = "Obesidade grau III";
    }

    document.getElementById("respClass").innerHTML = classi;
}


