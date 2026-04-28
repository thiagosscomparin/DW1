// proteção
if (localStorage.getItem("logado") !== "true") {
  window.location.href = "login.html";
}

const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");
const sair = document.getElementById("sair");

// calcular
botao.addEventListener("click", function() {
  let total = 0;

  let d1 = document.getElementById("dog1").value * 22;
  let d2 = document.getElementById("dog2").value * 26;
  let d3 = document.getElementById("dog3").value * 29;
  let r1 = document.getElementById("refri1").value * 5;
  let r2 = document.getElementById("refri2").value * 8;

  total = d1 + d2 + d3 + r1 + r2;

  if (total === 0) {
    resultado.textContent = "Escolha algo!";
  } else {
    resultado.textContent = "Total: R$ " + total;
  }
  if (d1 < 0 || d2 < 0 || d3 < 0 || r1 < 0 || r2 < 0) {
   alert("Não coloque valores negativos!");
    return;
  }
  
});

// logout
sair.addEventListener("click", function() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
});