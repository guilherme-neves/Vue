export default {
    fields: [
        { key: "user_login", label: "Login" },
        { key: 'user_firstname', label: "Nome" },
        { key: "All Calls", label: "Total " },
        { key: "Outgoing Calls", label: "Saida" },
        { key: "Incoming Calls", label: "Entrada" },
        { key: "TimeInSeconds", label: "Duração" }
    ],
    json_fields: {
        Login: "user_login",
        Nome: "user_firstname",
        Sobrenome: "user_surname",
        Total: "All Calls",
        'Chamada da Fila': "CC calls",
        'Chamada Fora da Fila': "NOT CC calls",
        'Chamada Saida': "Outgoing Calls",
        'Chamada Entrada': "Incoming Calls",
        'Duração': "TimeInSeconds"
    }
}