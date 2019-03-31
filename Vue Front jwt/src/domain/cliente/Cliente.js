
export default class Cliente {

    constructor(id_cliente, razao_social, cnpj, cpf, ins_estadual, isento_icms, ins_suframa, email) {
        this.id_cliente = id_cliente;
        this.razao_social = razao_social;
        this.cnpj = cnpj;
        this.cpf = cpf;
        this.ins_estadual = ins_estadual;
        this.isento_icms = isento_icms;
        this.ins_suframa = ins_suframa;
        this.email = email;
    }

}