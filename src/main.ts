import {
    cadastroProduto, listarProdutos, buscarProdutoId,
    buscarProdutoNome, filtrarPrCategoria,
    atualizarProduto, deletarProduto
} from './produto';
import { cadastrarCliente, listarClientes, buscarClienteId } from './clientes';
import { adicionarCarrinho, alterarCarrinho } from './carrinho';

// Roda um teste e mostra se deu certo ou qual erro foi lançado
function tentar(descricao: string, acao: () => void): void {
    try {
        acao();
        console.log(`OK    | ${descricao}`);
    } catch (erro) {
        console.log(`ERRO  | ${descricao} -> ${(erro as Error).message}`);
    }
}

console.log('=== PRODUTOS ===');
tentar('Cadastrar Teclado', () =>
    cadastroProduto({ id: 2, nome: 'Teclado', categoria: 'Periféricos', preco: 120, estoque: 5 }));
tentar('Cadastrar Monitor', () =>
    cadastroProduto({ id: 3, nome: 'Monitor', categoria: 'Telas', preco: 800, estoque: 0 }));
console.log('Todos:', listarProdutos());
console.log('Busca id 2:', buscarProdutoId(2));
console.log('Busca nome "mou":', buscarProdutoNome('mou'));
console.log('Categoria periféricos:', filtrarPrCategoria('periféricos'));

tentar('Atualizar Teclado (preço 150)', () =>
    atualizarProduto(2, { id: 2, nome: 'Teclado', categoria: 'Periféricos', preco: 150, estoque: 5 }));
tentar('Remover Monitor', () => deletarProduto(3));

console.log('\n=== PRODUTOS: CASOS INVÁLIDOS ===');
tentar('Preço negativo', () =>
    cadastroProduto({ id: 10, nome: 'X', categoria: 'Y', preco: -5, estoque: 1 }));
tentar('Id duplicado', () =>
    cadastroProduto({ id: 1, nome: 'X', categoria: 'Y', preco: 5, estoque: 1 }));
tentar('Nome vazio', () =>
    cadastroProduto({ id: 11, nome: '  ', categoria: 'Y', preco: 5, estoque: 1 }));
tentar('Estoque negativo', () =>
    cadastroProduto({ id: 12, nome: 'X', categoria: 'Y', preco: 5, estoque: -1 }));
tentar('Alterar o id na atualização', () =>
    atualizarProduto(1, { id: 99, nome: 'Mouse', categoria: 'Periféricos', preco: 50, estoque: 10 }));
tentar('Remover produto inexistente', () => deletarProduto(999));

console.log('\n=== CLIENTES ===');
tentar('Cadastrar Ana', () => cadastrarCliente({ id: 4, nome: 'Ana', email: 'ana@email.com' }));
console.log('Todos:', listarClientes());
console.log('Busca id 2:', buscarClienteId(2));

console.log('\n=== CLIENTES: CASOS INVÁLIDOS ===');
tentar('Id duplicado', () => cadastrarCliente({ id: 1, nome: 'Z', email: 'z@email.com' }));
tentar('E-mail duplicado (maiúsculas)', () =>
    cadastrarCliente({ id: 5, nome: 'Z', email: 'NELSON@email.com' }));
tentar('E-mail inválido', () => cadastrarCliente({ id: 6, nome: 'Z', email: 'zemail.com' }));
tentar('Nome vazio', () => cadastrarCliente({ id: 7, nome: '', email: 'w@email.com' }));

console.log('\n=== CARRINHO ===');
// Mouse (id 1) tem estoque 10
tentar('Adicionar 6 do Mouse', () =>
    adicionarCarrinho({ produtoId: 1, clienteId: 1, quantidade: 6 }));
tentar('Adicionar +3 do Mouse (soma 9, deve passar)', () =>
    adicionarCarrinho({ produtoId: 1, clienteId: 1, quantidade: 3 }));
tentar('Alterar Mouse para 4', () =>
    alterarCarrinho({ produtoId: 1, clienteId: 1, quantidade: 4 }));

console.log('\n=== CARRINHO: CASOS INVÁLIDOS ===');
tentar('Adicionar +7 (4 + 7 = 11 > estoque 10)', () =>
    adicionarCarrinho({ produtoId: 1, clienteId: 1, quantidade: 7 }));
tentar('Quantidade zero', () =>
    adicionarCarrinho({ produtoId: 1, clienteId: 2, quantidade: 0 }));
tentar('Quantidade negativa', () =>
    adicionarCarrinho({ produtoId: 1, clienteId: 2, quantidade: -2 }));
tentar('Produto inexistente', () =>
    adicionarCarrinho({ produtoId: 999, clienteId: 1, quantidade: 1 }));
tentar('Alterar item que não está no carrinho', () =>
    alterarCarrinho({ produtoId: 2, clienteId: 3, quantidade: 1 }));