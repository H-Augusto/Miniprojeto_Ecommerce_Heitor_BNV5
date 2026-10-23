import { Pedido, itemPedido } from './types';
import { buscarClienteId } from './clientes';
import { buscarProdutoId, baixarEstoque } from './produto';
import { listarCarrinho, limparCarrinho } from './carrinho';

const pedidos: Pedido[] = [];
let proximoId = 1;

export function finalizarPedido(clienteId: number): Pedido {
    if (!buscarClienteId(clienteId)) {
        throw new Error('Cliente não encontrado');
    }

    const itensCarrinho = listarCarrinho(clienteId);
    if (itensCarrinho.length === 0) {
        throw new Error('O carrinho está vazio');
    }

    // Valida todos os itens
    const itens: itemPedido[] = itensCarrinho.map(item => {
        const produto = buscarProdutoId(item.produtoId);
        if (!produto) {
            throw new Error(`Produto ${item.produtoId} não encontrado`);
        }
        if (item.quantidade > produto.estoque) {
            throw new Error(`Estoque insuficiente para ${produto.nome}`);
        }
        return {
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: produto.preco,
        };
    });

    const total = itens.reduce((soma, item) => soma + item.precoUnitario * item.quantidade, 0);

    itens.forEach(item => baixarEstoque(item.produtoId, item.quantidade));

    const pedido: Pedido = { id: proximoId++, clienteId, itens, total, data: new Date() };
    pedidos.push(pedido);
    limparCarrinho(clienteId);

    return pedido;
}

export function listarPedidos(): Pedido[] {
    return pedidos;
}

export function listarPedidosCliente(clienteId: number): Pedido[] {
    return pedidos.filter(pedido => pedido.clienteId === clienteId);
}