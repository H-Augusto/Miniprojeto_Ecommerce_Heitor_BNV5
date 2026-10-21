"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroProduto = cadastroProduto;
exports.listarProdutos = listarProdutos;
exports.buscarProdutoId = buscarProdutoId;
exports.buscarProdutoNome = buscarProdutoNome;
exports.filtrarPrCategoria = filtrarPrCategoria;
exports.atualizarProduto = atualizarProduto;
const produtos = [{ id: 1, nome: "Mouse", categoria: "Periféricos", preco: 50, estoque: 10 },];
function cadastroProduto(produto) {
    // validações (id, nome, preço, estoque)
    if (produtos.some(p => p.id === produto.id)) {
        throw new Error('Já existe um produto com esse id');
    }
    else if (produto.nome.trim() === '') {
        throw new Error('O nome do produto não pode ser vazio');
    }
    else if (produto.preco < 0) {
        throw new Error('O preço do produto deve ser positivo');
    }
    else if (produto.estoque < 0) {
        throw new Error('O estoque do produto esta negativo');
    }
    produtos.push(produto);
}
function listarProdutos() {
    return produtos;
}
function buscarProdutoId(id) {
    return produtos.find(produto => produto.id === id);
}
function buscarProdutoNome(nome) {
    return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
}
function filtrarPrCategoria(categoria) {
    return produtos.filter(produto => produto.categoria.toLowerCase() === categoria.toLowerCase());
}
function atualizarProduto(id, produtoAtualizado) {
}
// export function deletarProduto(id: number): void {
// }
