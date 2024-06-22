/** Classe representando um repositório com CRUD para o model Produto */

import { Produto } from "./Produto";

export class RepositoryProduto {
    constructor () {
        this.produtos = [
            { nome: 'produto1', descricao: 'Descrição do produto 1', valor: 10.99, disponibilidadeParaVenda: true },
            { nome: 'produto2', descricao: 'Descrição do produto 2', valor: 15.50, disponibilidadeParaVenda: true },
            { nome: 'produto3', descricao: 'Descrição do produto 3', valor: 20.00, disponibilidadeParaVenda: false },
            { nome: 'produto4', descricao: 'Descrição do produto 4', valor: 25.75, disponibilidadeParaVenda: true },
            { nome: 'produto5', descricao: 'Descrição do produto 5', valor: 30.20, disponibilidadeParaVenda: false },
            { nome: 'produto6', descricao: 'Descrição do produto 6', valor: 35.00, disponibilidadeParaVenda: true },
            { nome: 'produto7', descricao: 'Descrição do produto 7', valor: 40.99, disponibilidadeParaVenda: true },
            { nome: 'produto8', descricao: 'Descrição do produto 8', valor: 45.10, disponibilidadeParaVenda: false },
            { nome: 'produto9', descricao: 'Descrição do produto 9', valor: 50.00, disponibilidadeParaVenda: true },
            { nome: 'produto10', descricao: 'Descrição do produto 10', valor: 55.60, disponibilidadeParaVenda: false }
        ];
    }

    create( nome, descricao, valor, disponibilidadeParaVenda ) {
        try {
            const produto = new Produto( nome, descricao, valor, disponibilidadeParaVenda );
            this.produtos.push( produto );
            return "success";
        } catch ( error ) {
            return "error: " + error.message;
        }
    }

    delete ( nome ) {
        nome = nome.toLowerCase().trim();

        for ( let i = 0 ; i < this.produtos.length ; i++ ) {
            if ( this.produtos[i].nome === nome ) {
                this.produtos.splice( i, 1 );
                return "success";
            }
        }

        return "error: O produto não foi encontrado";
    }

    updateShowForm( nome ) {
        return this.readByNome( nome );
    }

    updatePersistence( nome, descricao, valor, disponibilidadeParaVenda, produto ) {
        try {
            const novoProduto = new Produto( nome, descricao, valor, disponibilidadeParaVenda );
            for ( let p of this.produtos ) {
                if ( p.nome === produto.nome ) {
                    p.nome = novoProduto.nome;
                    p.descricao = novoProduto.descricao;
                    p.valor = novoProduto.valor;
                    p.disponibilidadeParaVenda = novoProduto.disponibilidadeParaVenda;
                    return "success";
                }
            }
            return "error: produto não encontrado";
        } catch ( error ) {
            return "error: " + error.message;
        }
    }

    readAll() {
        return this.produtos;
    }

    readByNome( nome ) {
        nome = nome.toLowerCase().trim();

        for ( let produto of this.produtos ) {
            if ( produto.nome === nome ) {
                return produto;
            }
        }

        return "error: produto não encontrado";
    }
}


