import { itemCarrinho } from './types';
import { buscarProdutoId } from './produto';

const carrinho: itemCarrinho[] = [];

// Valida produto
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
    // Barra quantidade inválida
    validarQuantidade(item.produtoId, item.quantidade);

    const existente = carrinho.find(
        i => i.produtoId === item.produtoId && i.clienteId === item.clienteId
    );

    const quantidadeFinal = existente
        ? existente.quantidade + item.quantidade
        : item.quantidade;

    // Validacao total do estoque
    validarQuantidade(item.produtoId, quantidadeFinal);

    if (existente) {
        existente.quantidade = quantidadeFinal;
    } else {
        carrinho.push(item);
    }
}

// Substitui a antiga quantidade por uma nova no carrinho.
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
