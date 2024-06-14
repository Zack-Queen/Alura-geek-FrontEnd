// SHOW PRODUCTS

import { connectApi } from "./connectApi.js";
import { deleteProduct } from "./deleteProduct.js";

const products = document.querySelector("[data-products]");

function buildCard(name, price, image, id) {
    const card = document.createElement("ul");
    card.className = "product__card";
    card.innerHTML = `
        <div class="product__card__top">
            <li class="product__img"><img src="${image}" alt="${name}"></li>
            <li class="product__name">${name}</li>
        </div>
        <div class="product__card__bottom">
            <li class="product__price">R$ ${price}</li>
            <li><button class="product__card__delete" id=${id} data-form-delete><img src="./assets/trash.png" alt="icone de lixeira"></button></li>
        </div>
    `;

    return card;
}

async function listProducts() {
    try {
        const listApi = await connectApi.listProducts();

        if (listApi.length > 0) {
            listApi.forEach(element => {
                products.appendChild(buildCard(element.nome, element.preco, element.imagem, element.id));
            });

            const deleteBtns = document.querySelectorAll("[data-form-delete]");
            deleteBtns.forEach(btn => {
                btn.addEventListener("click", () => deleteProduct(btn.id));
            });
        } else {
            products.innerHTML = `
                <h1 class="no__product">NENHUM PRODUTO CADASTRADO</h1>
            `;
        }
    } catch (error) {
        products.innerHTML = `
            <h1 class="no__product">NÃO FOI POSSÍVEL CARREGAR OS PRODUTOS</h1>
        `;
        console.error("Erro ao listar produtos:", error);
    }
}

listProducts();