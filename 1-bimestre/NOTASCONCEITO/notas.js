function fCalcular(){
    let ra = document.getElementById("inputRA").value;
    let nome =document.getElementById("inputNome").value;
    let nota1 = parseFloat(document.getElementById("inputnota1").value);
    let nota2 = parseFloat(document.getElementById("inputnota2").value);
    let nota3 = parseFloat(document.getElementById("inputnota3").value);
    let nota4 = parseFloat(document.getElementById("inputnota4").value);
    let ME = parseFloat(document.getElementById("inputME").value);

    let MA = (nota1 + nota2 * 2 + nota3 * 3 + nota4  *4 + ME )/11;
    let conceito = "";
            let situacao = "";

            if (MA >= 9) {
                conceito = "A";
                situacao = "APROVADO";
            } 
            else if (MA >= 7.5) {
                conceito = "B";
                situacao = "APROVADO";
            } 
            else if (MA >= 6) {
                conceito = "C";
                situacao = "APROVADO";
            } 
            else if (MA >= 4) {
                conceito = "D";
                situacao = "REPROVADO";
            } 
            else {
                conceito = "E";
                situacao = "REPROVADO";
            }

            document.getElementById("respMA").innerHTML =
                "Aluno: " + nome +
                "<br>RA: " + ra +
                "<br>Nota 1: " + nota1 +
                "<br>Nota 2: " + nota2 +
                "<br>Nota 3: " + nota3 +
                "<br>Nota 4: " + nota4 +
                "<br>Média dos exercícios: " + ME +
                "<br>Média de aproveitamento: " + MA.toFixed(2) +
                "<br>Conceito: " + conceito +
                "<br>Situação: " + situacao;
        }
