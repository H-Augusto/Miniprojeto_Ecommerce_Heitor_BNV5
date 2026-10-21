import { Produto } from './types';

const produtos: Produto[] = [];
export function cadastroProduto(produto: Produto): void {
    
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

export function atualizarProduto(id: number, produtoAtualizado: Produto): void{
    
}

export function deletarProduto(id: number): void {
    
}