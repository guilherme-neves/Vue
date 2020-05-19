export default {
  fieldsCliente: [
    {
      key: "cli_status",
      label: "Status",
      sortable: true,
      formatter: value => (value ? "Ativo" : "Desativo")
    },
    { key: "cli_nome", label: "Nome", sortable: true },
    { key: "cli_cpfcnpj", label: "CPF/CNPJ", sortable: true },
    { key: "actions", label: "Ações" }
  ],
  optionscnpjcpf: [
    { text: "CNPJ", value: "0" },
    { text: "CPF", value: "1" }
  ],
  optionsstatus: [
    { text: "Ativo", value: "1" },
    { text: "Desativo", value: "0" },

  ]
}