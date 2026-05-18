var carrinho = [];

var btnCarrinho = document.getElementById("btn-carrinho");
var painelCarrinho = document.getElementById("carrinho-painel");
var overlay = document.getElementById("carrinho-overlay");
var btnFechar = document.getElementById("btn-fechar-carrinho");
var listaItens = document.getElementById("carrinho-itens");
var textoVazio = document.getElementById("carrinho-vazio");
var contadorSpan = document.getElementById("carrinho-contador");
var totalSpan = document.getElementById("carrinho-total");
var alerta = document.getElementById("alerta-carrinho");
var btnFinalizar = document.getElementById("btn-finalizar");

var botoesAdicionar = document.querySelectorAll(".btn-adicionar");

for (var i = 0; i < botoesAdicionar.length; i++) {
    botoesAdicionar[i].addEventListener("click", function () {
        var nome = this.getAttribute("data-nome");
        var preco = parseFloat(this.getAttribute("data-preco"));
        var img = this.getAttribute("data-img");

        adicionarAoCarrinho(nome, preco, img);
    });
}

function adicionarAoCarrinho(nome, preco, img) {
    var encontrou = false;

    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].nome === nome) {
            carrinho[i].quantidade = carrinho[i].quantidade + 1;
            encontrou = true;
            break;
        }
    }

    if (!encontrou) {
        var produto = {
            nome: nome,
            preco: preco,
            img: img,
            quantidade: 1
        };
        carrinho.push(produto);
    }

    atualizarCarrinho();
    mostrarAlerta();
}

function removerDoCarrinho(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    var totalItens = 0;
    for (var i = 0; i < carrinho.length; i++) {
        totalItens = totalItens + carrinho[i].quantidade;
    }
    contadorSpan.textContent = totalItens;

    if (carrinho.length === 0) {
        textoVazio.style.display = "block";
    } else {
        textoVazio.style.display = "none";
    }

    var itensAntigos = listaItens.querySelectorAll(".carrinho-item");
    for (var i = 0; i < itensAntigos.length; i++) {
        itensAntigos[i].remove();
    }

    for (var i = 0; i < carrinho.length; i++) {
        var item = carrinho[i];

        var divItem = document.createElement("div");
        divItem.className = "carrinho-item";

        var imgEl = document.createElement("img");
        imgEl.src = item.img;
        imgEl.alt = item.nome;

        var divInfo = document.createElement("div");
        divInfo.className = "carrinho-item-info";

        var pNome = document.createElement("p");
        pNome.textContent = item.nome;

        var spanDetalhes = document.createElement("span");
        var precoFormatado = item.preco.toFixed(2).replace(".", ",");
        spanDetalhes.textContent = "R$ " + precoFormatado + " x " + item.quantidade;

        divInfo.appendChild(pNome);
        divInfo.appendChild(spanDetalhes);

        var btnRemover = document.createElement("button");
        btnRemover.className = "btn-remover";
        btnRemover.textContent = "✕";
        btnRemover.setAttribute("data-indice", i);
        btnRemover.addEventListener("click", function () {
            var indice = parseInt(this.getAttribute("data-indice"));
            removerDoCarrinho(indice);
        });

        divItem.appendChild(imgEl);
        divItem.appendChild(divInfo);
        divItem.appendChild(btnRemover);

        listaItens.appendChild(divItem);
    }

    var total = 0;
    for (var i = 0; i < carrinho.length; i++) {
        total = total + (carrinho[i].preco * carrinho[i].quantidade);
    }
    totalSpan.textContent = total.toFixed(2).replace(".", ",");
}

function abrirCarrinho() {
    painelCarrinho.classList.add("aberto");
    overlay.classList.add("ativo");
}
function fecharCarrinho() {
    painelCarrinho.classList.remove("aberto");
    overlay.classList.remove("ativo");
}

function mostrarAlerta() {
    alerta.classList.add("visivel");

    setTimeout(function () {
        alerta.classList.remove("visivel");
    }, 2000);
}

btnCarrinho.addEventListener("click", abrirCarrinho);
btnFechar.addEventListener("click", fecharCarrinho);
overlay.addEventListener("click", fecharCarrinho);

btnFinalizar.addEventListener("click", function () {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
    } else {
        alert("Compra finalizada com sucesso! 🐾 Obrigado por comprar no PetShop!");
        carrinho = [];
        atualizarCarrinho();
        fecharCarrinho();
    }
});
