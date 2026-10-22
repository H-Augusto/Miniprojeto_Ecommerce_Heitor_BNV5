import { Cliente } from './types';

const clientes: Cliente[] = [
    { id: 1, nome: "Nelson", email: "nelson@email.com" },
    { id: 2, nome: "Maria", email: "maria@email.com" },
    {id: 3, nome: "Kleber", email: "kleber@email.com"}
];

export function cadastrarCliente(cliente: Cliente): void {
    // validações (id, nome, email)

    if (clientes.some(c => c.id === cliente.id)) {
        throw new Error('Já existe um cliente com esse id');
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
        throw new Error('O email do cliente é inválido');
    }
    else if (clientes.some(c => c.email.toLowerCase() === cliente.email.toLowerCase())) {
        throw new Error('Já existe um cliente com esse email');
    }
    else if (cliente.nome.trim() === '') {
        throw new Error('O nome do cliente não pode ser vazio');
    }
    clientes.push(cliente);
}

export function listarClientes(): Cliente[] {
    return clientes;
}

export function buscarClienteId(id: number): Cliente | undefined {
    return clientes.find(cliente => cliente.id === id);
}

