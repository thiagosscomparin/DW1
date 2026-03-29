function funcaoCalcular() {
    let classi ="";
    let peso = parseFloat(document.getElementById("inputPeso").value);
    let altura = parseFloat(document.getElementById("inputAltura").value);
    let imc = peso / (altura * altura);
      document.getElementById("respIMC").innerHTML = imc.toFixed(2);
      
       if (peso === "" || altura === "" || peso <= 0 || altura <= 0) {
        aviso.innerHTML = " Preencha os campos corretamente!";
        aviso.style.display = "block";
        return;
    }

    aviso.style.display = "none";

    let footer = document.getElementById("footer");
    let mensagem = document.getElementById("mensagem");
    if(imc< 18.5){
        classi= "abaixo do peso";
    }else if(18.5<imc<25){
        classi="Peso normal";
    } else if(25<imc<30){
        classi="Sobrepeso";
    } else if(30<imc<35){
        classi="Obesidade grau I";
    }else if(35<imc<40){
        classi="Obesidade grau II";
    }else{
        classi="Obesidade grau III";
    }
    document.getElementById("respClass").innerHTML = classi;

    
     


}
