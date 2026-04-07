function fcalcular(){
    debugger
    let tarifa = 0;
    let h = parseInt(document.getElementById("inputHoras").value);
    let grande = document.getElementById("inputTamanho").checked;
    let cf = document.getElementById("inputFrequente").checked;

    if(h <= 0){
        alert("O número de horas deve ser maior que 0");
        return;
    }

    // Até 24 horas
    if(h < 24){
        tarifa =2.5 + h * 2.5;
    } 
    // Mais de 24 horas
    else {
        let dias = Math.floor(h / 24);
        let resto = h % 24;

        tarifa = dias * 60; // diária
        tarifa += resto * 2.5; // horas extras
    }

    // Carro grande
    if(grande){
        tarifa *= 1.25;
    }

    // Cliente frequente
    if(cf){
        tarifa *= 0.95;
    }

    document.getElementById("resp").innerHTML =
        "O valor da sua tarifa é igual a R$ " + tarifa.toFixed(2);
}
