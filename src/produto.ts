import { Produto } from './types';

const produtos: Produto[] = [
    { id: 1, nome: "Mouse", categoria: "Periféricos", preco: 50, estoque: 10 },
];

function validarProduto(produto: Produto): void {
    if (produto.nome.trim() === '') {
        throw new Error('O nome do produto não pode ser vazio');
    }
    if (produto.preco <= 0) {
        throw new Error('O preço do produto deve ser maior que zero');
    }
    if (produto.estoque < 0) {
        throw new Error('O estoque do produto não pode ser negativo');
    }
}

export function cadastroProduto(produto: Produto): void {
    if (produtos.some(p => p.id === produto.id)) {
        throw new Error('Já existe um produto com esse id');
    }
    validarProduto(produto);
    produtos.push(produto);
}

export function listarProdutos(): Produto[] {
    return produtos;
}

export function buscarProdutoId(id: number): Produto | undefined {
    return produtos.find(produto => produto.id === id);
}

export function buscarProdutoNome(nome: string): Produto[] {
    return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
}

export function filtrarPrCategoria(categoria: string): Produto[] {
    return produtos.filter(produto => produto.categoria.toLowerCase() === categoria.toLowerCase());
}

export function atualizarProduto(id: number, produtoAtualizado: Produto): void {
    const indice = produtos.findIndex(produto => produto.id === id);
    if (indice === -1) {
        throw new Error('Produto não encontrado');
    }
    if (produtoAtualizado.id !== id) {
        throw new Error('Não é permitido alterar o id do produto');
    }
    validarProduto(produtoAtualizado);
    produtos[indice] = produtoAtualizado;
}

export function deletarProduto(id: number): void {
    const indice = produtos.findIndex(produto => produto.id === id);
    if (indice === -1) {
        throw new Error('Produto não encontrado');
    }
    produtos.splice(indice, 1);
}

export function baixarEstoque(id: number, quantidade: number): void {
    const produto = buscarProdutoId(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    produto.estoque -= quantidade;
}