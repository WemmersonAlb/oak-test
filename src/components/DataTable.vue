<script>
import { RepositoryProduto } from '@/assets/scripts/RepositoryProduto';

const repositorioProduto = new RepositoryProduto();

export default {
    name: 'DataTable',
    data(){
        return{
            produtos: null,
            formProduto: false,
            titulo_form: '',
            estado_form: 0, //0: neutro   1: create   2: update
            btn_envio: '',

            produto_update: null,

            nome_produto: null,
            descricao_produto: null,
            valor_produto: null,
            disponibilidade_produto: null
        }
    },
    methods:{
        verificadorDeEstadoDoFormulario(e){
            e.preventDefault();
            if( this.estado_form === 1 ){
                this.createProdutoPersistencia();
                this.estado_form = 0;
            }
            if( this.estado_form === 2 ){
                this.updateProdutoPersistencia();
                this.estado_form = 0;
            }
        },
        createProdutoShow(){
            this.formProduto = true;
            this.titulo_form = 'Cadastro de Produtos'
            this.estado_form = 1;
            this.btn_envio = 'Criar novo Produto';
            
        },
        updateProdutoShow( nome ){
            this.formProduto = true;
            this.titulo_form = 'Editando Produto';
            this.estado_form = 2;
            this.btn_envio = 'Atualizar Produto';

            this.produto_update = repositorioProduto.updateShowForm( nome );

            this.nome_produto = this.produto_update.nome;
            this.descricao_produto = this.produto_update.descricao;
            this.valor_produto = this.produto_update.valor;
            this.disponibilidade_produto = this.produto_update.disponibilidadeParaVenda ? 'sim' : 'nao';
        },
        createProdutoPersistencia(){            
            /*
            A implementação a seguir ocorre desta forma para garantir que
            as únicas entradas possíveis sejam o sim e o não do radio.
            Desta forma a classe Produto consegue lidar com a a ausência
            de valor levantando um throw.
            */
            let disponibilidade_boolean;
            if(this.disponibilidade_produto === 'sim'){
                disponibilidade_boolean = true;
            }
            if(this.disponibilidade_produto === 'nao'){
                disponibilidade_boolean = false;
            }


            const res = repositorioProduto.create( this.nome_produto, 
                                                    this.descricao_produto, 
                                                    this.valor_produto, 
                                                    disponibilidade_boolean );
            console.log(res);
            this.readAllProdutos();
            this.formProduto = false;
            this.nome_produto = '';
            this.descricao_produto = '';
            this.valor_produto = '';
            this.disponibilidade_produto = '';
            this.titulo_form = '';
            this.btn_envio = '';
        },
        updateProdutoPersistencia(){
            let disponibilidade_boolean;
            if(this.disponibilidade_produto === 'sim'){
                disponibilidade_boolean = true;
            }
            if(this.disponibilidade_produto === 'nao'){
                disponibilidade_boolean = false;
            }

            const res = repositorioProduto.updatePersistence( this.nome_produto, 
                                                    this.descricao_produto, 
                                                    this.valor_produto, 
                                                    disponibilidade_boolean,
                                                    this.produto_update);
            console.log(res);
            this.readAllProdutos();
            this.formProduto = false;
            this.nome_produto = '';
            this.descricao_produto = '';
            this.valor_produto = '';
            this.disponibilidade_produto = '';
            this.titulo_form = '';
            this.btn_envio = '';
        },
        deleteProduto( nome ){
            const res = repositorioProduto.delete(nome);
            console.log(res);
            this.readAllProdutos();

            /*Força a reconstrução da tabela*/
            this.formProduto = true;
            this.formProduto = false;
        },
        readAllProdutos(){
            this.produtos = repositorioProduto.readAll();
            this.produtos.sort( ( a, b ) => a.nome.localeCompare( b.nome ) );
        }
    },
    mounted(){
        this.readAllProdutos();
    }
}
</script>
<template>
    <div id="main-div">
        <div class="table" v-show="!formProduto">
            <div id="header-table">
                <h2 class="verde-agua">Lista de Produtos</h2>
                <button class="novo-produto-btn" @click="createProdutoShow">Criar Novo Produto</button>
            </div>
            <table id="tabela-produtos">
                <thead>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Disponibilidade</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <tr v-for="(p, id) in produtos" :key="id" class="table-row">
                        <td>{{ p.nome }}</td>
                        <td>{{ p.descricao }}</td>
                        <td>{{ p.valor }}</td>
                        <td>{{ p.disponibilidadeParaVenda }}</td>
                        <td class="table-actions">
                            <button @click="updateProdutoShow(p.nome)" class="btn">Editar</button>
                            <button @click="deleteProduto(p.nome)" class="btn">Deletar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="novoProdutoForm" v-show="formProduto">
            <h2 class="verde-agua">{{ titulo_form }}</h2>
            <form id="novoProdutoForm" @submit="verificadorDeEstadoDoFormulario" autocomplete="off">
                <div class="input-container">
                    <label for="nome">Nome do Produto:</label>
                    <input type="text" name="nome" id="nome-produto" v-model="nome_produto" required>
                </div>
                <div class="input-container">
                    <label for="descricao">Descrição do Produto:</label>
                    <textarea name="descricao" v-model="descricao_produto" id="descricao-produto" cols="30" rows="3" required></textarea>
                </div>
                <div class="input-container">
                    <label for="valor">Valor:</label>
                    <input type="number" name="valor" id="valor-produto" v-model="valor_produto" min="0" required>
                </div>
                <div class="input-container">
                    <div class="radio">
                        <p>Disponibilidade: </p>
                        <div class="opcoes-radio">
                            <div class="opcao-radio">
                                <input type="radio" id="opcao1" name="disponibilidade" value="sim" v-model="disponibilidade_produto" required>
                                <label for="sim">Sim</label>
                            </div>
                            <div class="opcao-radio">
                                <input type="radio" id="opcao2" name="disponibilidade" value="nao" v-model="disponibilidade_produto" required>
                                <label for="nao">Não</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" :value="btn_envio" class="submit-btn">
                    <button @click="formProduto=false">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
    /*Header da tabela*/
    h2{
        font-weight: 600;
    }
    #header-table{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .novo-produto-btn{
        padding: 5px 10px;
        background-color: #1C8894;
        color: #222;
        border: 2px solid #1C8894;
        border-radius: 2px;
        font-weight: bold;
        box-shadow: 2px 2px 5px #222222a8;
        cursor: pointer;
    }
    .novo-produto-btn:hover{
        background-color: #fff;
        color: #1C8894;
    }

    /*Tabela*/
    table{
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }
    thead{
        background-color: #1C8894;
        color: #222;
        border-bottom: 2px solid #222;
    }
    th{
        font-weight: bold;
    }
    th, td{
        padding: 10px 20px;
        margin: 0;
        text-align: center;
    }
    tr{
        border-bottom: 1px solid #222;
    }
    .btn{
        padding: 5px 10px;
        background-color: #fff;
        color: #1C8894;
        border: 2px solid #1C8894;
        border-radius: 2px;
        font-weight: bold;
        box-shadow: 2px 2px 5px #222222a8;
        cursor: pointer;
    }
    .btn:hover{
        background-color: #1C8894;
        color: #222;
    }
    .table-actions{
        display: flex;
        justify-content: space-around;
    }
</style>