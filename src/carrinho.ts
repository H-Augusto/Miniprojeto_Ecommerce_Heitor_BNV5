import { itemCarrinho } from './types';
import { buscarProdutoId } from './produto';

const carrinho: itemCarrinho[] = [];

function validarQuantidade(produtoId: number, quantidade: number): void {
    const produto = buscarProdutoId(produtoId);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    if (quantidade <= 0) {
        throw new Error('A quantidade deve ser maior que zero');
    }
    if (quantidade > produto.estoque) {
        throw new Error('Quantidade solicitada maior que o estoque disponível');
    }
}

export function adicionarCarrinho(item: itemCarrinho): void {
    validarQuantidade(item.produtoId, item.quantidade);

    const existente = carrinho.find(
        i => i.produtoId === item.produtoId && i.clienteId === item.clienteId
    );
    const quantidadeFinal = existente
        ? existente.quantidade + item.quantidade
        : item.quantidade;

    validarQuantidade(item.produtoId, quantidadeFinal);

    if (existente) {
        existente.quantidade = quantidadeFinal;
    } else {
        carrinho.push(item);
    }
}

// item.quantidade é a nova quantidade (substitui a antiga)
export function alterarCarrinho(item: itemCarrinho): void {
    const indice = carrinho.findIndex(
        i => i.produtoId === item.produtoId && i.clienteId === item.clienteId
    );
    if (indice === -1) {
        throw new Error('Item não encontrado no carrinho');
    }
    validarQuantidade(item.produtoId, item.quantidade);
    carrinho[indice].quantidade = item.quantidade;
}

export function removerDoCarrinho(clienteId: number, produtoId: number): void {
    const indice = carrinho.findIndex(
        i => i.produtoId === produtoId && i.clienteId === clienteId
    );
    if (indice === -1) {
        throw new Error('Item não encontrado no carrinho');
    }
    carrinho.splice(indice, 1);
}

export function listarCarrinho(clienteId: number): itemCarrinho[] {
    return carrinho.filter(item => item.clienteId === clienteId);
}

export function calcularSubtotal(item: itemCarrinho): number {
    const produto = buscarProdutoId(item.produtoId);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }
    return produto.preco * item.quantidade;
}

export function calcularTotal(clienteId: number): number {
    return listarCarrinho(clienteId).reduce((total, item) => total + calcularSubtotal(item), 0);
}

export function limparCarrinho(clienteId: number): void {
    for (let i = carrinho.length - 1; i >= 0; i--) {
        if (carrinho[i].clienteId === clienteId) {
            carrinho.splice(i, 1);
        }
    }
}