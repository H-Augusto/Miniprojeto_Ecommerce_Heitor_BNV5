export type Produto = {
    id: number,
    nome: string,
    preco: number,
    descricao: string,
    estoque: number,
    categoria: string};

export type Cliente = {
    id: number,
    nome: string,
    email: string
};

export type itemCarrinho = {
    produtoId: number,
    clienteId: number,
    quantidade: number
};

export type itemPedido = {
    produtoId: number,
    quantidade: number
    precoUnitario: number,
};

export type Pedido = {
    id: number,
    clienteId: number,
    itens: itemPedido[],
    total: number,
    data: Date
};
