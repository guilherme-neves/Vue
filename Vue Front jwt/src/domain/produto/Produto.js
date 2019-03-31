

export default class Produto {
    constructor(idProduto, prod_desc = '', ean = '', ean_unid = 0, ex_tipi = '', unid_com = 0, valor_unit = 0, unid_trib = 0, qtd_trib = 0, valor_unit_trib = 0) {
        this.idProduto = idProduto
        this.prod_desc = prod_desc
        this.ean = ean
        this.ean_unid = ean_unid
        this.ex_tipi = ex_tipi
        this.unid_com = unid_com
        this.valor_unit = valor_unit
        this.unid_trib = unid_trib
        this.qtd_trib = qtd_trib
        this.valor_unit_trib = valor_unit_trib

    }
}