/** Classe representando o model Produto com validação de tipos no construtor */
export class Produto {
    constructor ( nome, descricao, valor, disponibilidadeParaVenda ) {
        if ( typeof nome !== 'string' || nome.trim() === "" ) {
            throw new Error( "nome deve ser uma string não vazia" );
        }
        if ( typeof descricao !== 'string' || descricao.trim() === "" ) {
            throw new Error( "descricao deve ser uma string não vazia" );
        }
        if ( typeof valor !== 'number' || valor <= 0 ) {
            throw new Error( "valor deve ser um número maior que zero" );
        }
        if ( typeof disponibilidadeParaVenda !== 'boolean' ) {
            throw new Error( "disponibilidadeParaVenda deve ser um booleano" );
        }

        this.nome = nome.toLowerCase().trim();
        this.descricao = descricao.trim();
        this.valor = valor;
        this.disponibilidadeParaVenda = disponibilidadeParaVenda;
    }
}
