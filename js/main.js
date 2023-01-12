const form = document.getElementById("novoItem");

form.addEventListener("submit", (e) => {
   e.preventDefault();
   const nome = e.target.elements["nome"].value;
   const quantidade = e.target.elements["quantidade"].value;
   console.log(nome, quantidade)
});