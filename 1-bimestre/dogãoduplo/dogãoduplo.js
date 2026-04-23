function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // usuário e senha corretos
    if (usuario === "admin" && senha === "1234") {
        document.getElementById("telaLogin").style.display = "none";
        document.getElementById("menu").style.display = "block";
    } else {
        document.getElementById("mensagemErro").innerText = "Usuário ou senha incorretos!";
    }
}