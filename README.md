# Miniprojeto E-commerce

**Estudante:** Heitor Augusto
**Turma:** T5M1 C2.3
**Curso:** Desenvolvedor Back-End Node
**Módulo 1, Semana 07**

## Objetivo

Sistema de gerenciamento de e-commerce em TypeScript e Node.js, executado pelo terminal. A aplicação administra um catálogo de produtos, cadastra clientes, monta carrinhos de compras e registra pedidos, mantendo o estoque e os valores consistentes durante a execução.

## Funcionalidades implementadas

**Produtos**
- Cadastrar, listar, atualizar e remover produtos
- Buscar por id, por parte do nome e filtrar por categoria

**Clientes**
- Cadastrar e listar clientes
- Buscar cliente por id
- Sistema iniciado com 3 clientes

**Carrinho**
- Adicionar, alterar e remover itens
- Listar os itens de um cliente
- Calcular o subtotal de cada item e o total da compra

**Pedidos**
- Finalizar uma compra a partir do carrinho
- Consultar todos os pedidos e os pedidos de um cliente
- Baixa automática do estoque após a compra

## Tecnologias utilizadas

- TypeScript
- Node.js
- Git e GitHub

Não são usadas bibliotecas externas, frameworks nem banco de dados.

## Estrutura dos arquivos

```
Miniprojeto_Ecommerce_Nome_Turma/
├── types.ts        # Tipos: Produto, Cliente, itemCarrinho, itemPedido, Pedido
├── produto.ts      # Cadastro, consulta, atualização, remoção e baixa de estoque
├── clientes.ts     # Cadastro e consulta de clientes
├── carrinho.ts     # Operações do carrinho e cálculo de valores
├── pedidos.ts      # Finalização e consulta de pedidos
├── relatorios.ts   # Consolidação e exibição dos resultados
├── main.ts         # Demonstração das funcionalidades
├── tsconfig.json   # Configuração do TypeScript
└── README.md
```

## Instruções de compilação e execução

**Pré-requisitos:** Node.js instalado.

```bash
# 1. Clonar o repositório
git clone "https://github.com/H-Augusto/Miniprojeto_Ecommerce_Heitor_BNV5"

# 2. Instalar o TypeScript (caso não tenha)
npm install -g typescript

# 3. Compilar
tsc

# 4. Executar
node dist/main.js
```

O caminho `dist/main.js` depende do `outDir` configurado no `tsconfig.json`. Sem `outDir`, os arquivos `.js` são gerados ao lado dos `.ts` e o comando é `node main.js`.

## Exemplos das principais operações

```typescript
// Cadastrar produto
cadastroProduto({ id: 2, nome: 'Teclado', categoria: 'Periféricos', preco: 120, estoque: 5 });

// Buscar produtos pelo nome (parte do nome)
buscarProdutoNome('mou');

// Cadastrar cliente
cadastrarCliente({ id: 4, nome: 'Ana', email: 'ana@email.com' });

// Adicionar 2 unidades do produto 1 ao carrinho do cliente 1
adicionarCarrinho({ produtoId: 1, clienteId: 1, quantidade: 2 });

// Calcular o total do carrinho do cliente 1
calcularTotal(1);

// Finalizar o pedido do cliente 1
finalizarPedido(1);

// Consultar pedidos do cliente 1
listarPedidosCliente(1);
```

O arquivo `main.ts` executa um fluxo completo de compra e testa casos inválidos. Cada teste mostra `OK` ou `ERRO` com a mensagem no terminal.

## Regras de negócio implementadas

**Produtos**
- O id deve ser único
- O nome não pode ser vazio
- O preço deve ser maior que zero
- O estoque não pode ser negativo (estoque 0 é permitido)
- Na atualização, o id do produto não pode ser alterado
- Não é possível atualizar ou remover um produto inexistente

**Clientes**
- O id deve ser único
- O e-mail deve ter formato válido e ser único, sem diferenciar maiúsculas de minúsculas
- O nome não pode ser vazio

**Carrinho**
- A quantidade deve ser maior que zero
- Não é possível adicionar produto inexistente
- A quantidade no carrinho não pode superar o estoque
- Adicionar um produto que já está no carrinho soma a quantidade, sem criar linha duplicada, e o estoque é validado com o total
- Subtotal = preço unitário × quantidade
- Total = soma dos subtotais

**Pedidos**
- O cliente precisa existir
- O carrinho não pode estar vazio
- Todos os itens são validados antes de alterar o estoque, então não há registro parcial
- O preço unitário é gravado no pedido no momento da compra, e mudanças futuras no catálogo não alteram pedidos antigos
- O estoque só é reduzido depois que o pedido é validado
- Cada pedido recebe um id único e sequencial
- Após a compra, o carrinho do cliente é esvaziado

## Limitações conhecidas

- Os dados ficam apenas em memória e são perdidos ao encerrar o programa
- Não há autenticação, pagamento, frete, cupons ou impostos
- A remoção de produtos é definitiva (não há exclusão lógica). Remover um produto que está em um carrinho faz o cálculo do subtotal desse carrinho falhar
- O carrinho não verifica se o cliente existe; essa validação ocorre apenas na finalização do pedido
- Os ids são informados manualmente, não são gerados automaticamente
- Os valores monetários usam `number`, que pode ter imprecisão em casas decimais
- Não há atualização nem remoção de clientes (não exigidas no enunciado)
- A validação de e-mail por expressão regular cobre o formato básico