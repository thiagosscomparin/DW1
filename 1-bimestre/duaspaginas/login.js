const botao = document.getElementById("btnLogin");
const erro = document.getElementById("erro");

botao.addEventListener("click", function() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "" || pass === "") {
    erro.textContent = "Preencha os campos!";
    return;
  }

  if (user === "admin" && pass === "123") {
    localStorage.setItem("logado", "true");
    window.location.href = "dogao.html";
  } else {
    erro.textContent = "Login errado!";
  }
});