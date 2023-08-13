class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    criarCarrinho(itens) {
        const carrinho = [];
    
        const itensPrincipaisAdicionados = new Set();
    
        for (const itemStr of itens) {
            const [codigo, quantidade] = itemStr.split(',');
    
            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }
    
            if (codigo === 'chantily' || codigo === 'queijo') {
                const itemPrincipal = codigo === 'chantily' ? 'cafe' : 'sanduiche';
                if (!itensPrincipaisAdicionados.has(itemPrincipal)) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            } else {
                itensPrincipaisAdicionados.add(codigo);
            }
    
            carrinho.push(itemStr);
        }
    
        return carrinho;
    }
    

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }
    
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
    
        const carrinho = this.criarCarrinho(itens);
    
        if (typeof carrinho === 'string') {
            return carrinho; // Retorna mensagem de erro da criação do carrinho
        }
    
        let valorTotal = 0;
    
        for (const itemStr of carrinho) {
            const [codigo, quantidade] = itemStr.split(',');
    
            if (parseInt(quantidade) <= 0) {
                return 'Quantidade inválida!';
            }
    
            valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);
        }
    
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aqui faz o desconto de 5% para pagamento com dinheiro
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Aqui faz o acréscimo de 3% para pagamento com crédito
        }
    
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
    
    
}

export { CaixaDaLanchonete };
